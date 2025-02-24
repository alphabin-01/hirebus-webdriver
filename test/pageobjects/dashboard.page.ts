import { $ } from '@wdio/globals'

class DashboardPage {
    get candidateName() { return $('button:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1)') }
    get candidateCompany() { return $("button:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(2)") }
    get candidateRole() { return $('(//button[1]/div[2]/div[1])[1]') }
    get candidateScore() { return $('(//button[1]/div[3]/div[1])[1]') }
    get editProfileButton() { return $('(//button[@data-testid="edit-profile-button"])[1]') }

    // Pagination Elements
    get gotoPageDropdown() { return $('(//select)[1]'); }
    get recordsPerPageDropdown() { return $('(//select)[2]'); } // Adjust this selector based on your dropdown
    get totalPages() { return $('[data-testid="total-pages"]'); } // Adjust based on your test's HTML structure
    get currentPage() { return $('[data-testid="current-page"]'); }
    get lastPageButton() { return $('[aria-label="last-page-button"]'); }
    get recordsList() { return $$(`(//button[@data-testid='viewProfile'])`); } // Adjust for the records displayed per page
    get firstPageButton() { return $('[aria-label="first-page-button"]'); }
    get nextPageButton() { return $('[aria-label="next-page-button"]'); }
    get previousPageButton() { return $('[aria-label="previous-page-button"]'); }
    get selectedRecordsPerPage() { return $$('select.select-bordered option:checked')[1]; }

    // Profile Options
    get profileButton() { return $('[type="button"]:nth-child(2)'); }
    get profileOption() { return $('(//div[@role="menuitem"])[1]'); }
    get logoutOption() { return $('(//div[@role="menuitem"])[2]'); }

    // Testing Link Modal
    get getTestingLinkButton() { return $('button[aria-label="testing-link-button"]') }
    get modal() { return $('div[id="headlessui-portal-root"]') }
    get companyName() { return $('input[aria-label="company-select"]') }
    get roleDropdown() { return $('input[aria-label="role-select"]') }
    get clearRoleButton() { return $('div[data-testid="Select a role"] div:nth-child(2) div:nth-child(1)') }
    get languageDropdown() { return $('input[aria-label="language-select"]') }
    get clearLanguageButton() { return $('div[id="language-select"] div:nth-child(2) div:nth-child(1)') }
    get linkTextbox() { return $('p[aria-label="full-link"]') }
    get copyLinkButton() { return $('button[aria-label="copy-testing-link-button"]') }

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

    // Get Total Number of Records
    async getTotalPages(): Promise<number> {
        const text = await this.totalPages.getText();
        return parseInt(text, 10);
    }

    // Get Number of Records on Current Page
    async getCurrentPageRecordsCount(): Promise<number> {
        return await (this.recordsList).length;
    }

    // Select Number of Records Per Page
    async selectRecordsPerPage(value: '10' | '20' | '30' | '50') {
        const dropdown = this.recordsPerPageDropdown;

        // Wait for the dropdown to be visible
        await dropdown.waitForDisplayed({ timeout: 20000 }); // Adjust timeout as needed

        // Select the value from the dropdown
        await dropdown.selectByAttribute('value', value);

        // Optionally, wait for records to update
        await browser.waitUntil(async () => {
            const recordsCount = await this.getCurrentPageRecordsCount();
            return recordsCount > 0; // Check if records have been updated
        }, { timeout: 5000, timeoutMsg: 'Records did not update after selecting records per page or no records found' });
    }


    // Calculate Total Pages Based on Total Records and Records Per Page
    calculateExpectedPages(totalRecords: number, recordsPerPage: number): number {
        return Math.ceil(totalRecords / recordsPerPage);
    }

    // Navigate to Last Page
    async goToLastPage() {
        await this.lastPageButton.click();
    }

    async goToFirstPage() {
        await this.firstPageButton.click();
    }

    // Get Current Page Number
    async getCurrentPageNumber(): Promise<number> {
        const text = await this.currentPage.getText();
        return parseInt(text, 10);
    }

}

export default new DashboardPage()
