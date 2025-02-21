import { $ } from '@wdio/globals'

class DashboardPage {
    get candidateName() { return $('button:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1)') }
    get candidateCompany() { return $("button:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(2)") }
    get candidateRole() { return $('(//button[1]/div[2]/div[1])[1]') }
    get candidateScore() { return $('(//button[1]/div[3]/div[1])[1]') }
    get editProfileButton() { return $('(//button[@data-testid="edit-profile-button"])[1]') }

    async isVisbleCandidateDetails() {
        // Wait for all elements to be displayed with increased timeout
        await browser.waitUntil(async () => {
            try {
                const nameDisplayed = await this.candidateName.isDisplayed();
                const roleDisplayed = await this.candidateRole.isDisplayed();
                const scoreDisplayed = await this.candidateScore.isDisplayed();
                return nameDisplayed && roleDisplayed && scoreDisplayed;
            } catch (error) {
                return false;
            }
        }, {
            timeout: 20000,
            timeoutMsg: 'Not all candidate details were displayed after 20 seconds',
            interval: 500
        });

        // Verify all elements are displayed
        await expect(this.candidateName).toBeDisplayed();
        await expect(this.candidateRole).toBeDisplayed();
        await expect(this.candidateScore).toBeDisplayed();
    }

    async verifyCandidateDetails(updatedDetails: { email: any; phone?: string; resumeLink?: string; company?: string; role: any; status: any }) {
        // Wait for candidate name to be visible and assert it matches the updated email
        const candidateCompanyText = await this.candidateCompany.getText();
        expect(candidateCompanyText).toBe(updatedDetails.company); // Assertion for email

        // Wait for candidate role to be visible and assert it matches the updated role
        const candidateRoleText = await this.candidateRole.getText();
        expect(candidateRoleText).toBe(updatedDetails.role); // Assertion for role
    }


    async openCandidateProfileEdit() {
        await this.editProfileButton.click()
    }
}

export default new DashboardPage()
