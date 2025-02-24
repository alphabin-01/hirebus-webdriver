import { $ } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';

class CandidateProfilePage {
    // Modal locator
    get modal() { return $(`(//div[@data-headlessui-state="open"])[2]`); }

    // Input fields using data-testid selectors
    get emailInput() { return $('input[data-testid="email-input"]'); }
    get phoneInput() { return $('input[data-testid="phone-input"]'); }
    get resumeLinkInput() { return $('input[data-testid="resume-link-input"]'); }

    // Dropdown input fields
    get companyInput() { return $('//input[@id="react-select-2-input"]'); }
    get roleInput() { return $('//input[@id="react-select-3-input"]'); }
    get statusDropdown() { return $('//input[@id="react-select-4-input"]'); }

    // Update button and success message
    get updateButton() { return $('//button[@data-testid="update-button"]'); }
    get successMessage() { return $('div[role="alert"] div:nth-child(2)'); }

    async verifyModalDisplayed() {
        await this.modal.waitForDisplayed({ timeout: 10000 });
    }

    // Helper to select dropdown options
    async selectDropdown(dropdownElement: ChainablePromiseElement, value: string) {
        await dropdownElement.click();
        await dropdownElement.setValue(value);
        await browser.pause(500); // Optional: wait for options to update
        await browser.keys('Enter');
    }

    async updateCandidateProfile(details: {
        email: string;
        phone: string;
        resumeLink: string;
        company: string;
        role: string;
        status: string;
    }) {
        await this.emailInput.setValue(details.email);
        await this.phoneInput.setValue(details.phone);
        await this.resumeLinkInput.setValue(details.resumeLink);

        // Use the helper for each dropdown
        await this.selectDropdown(this.companyInput, details.company);
        await this.selectDropdown(this.roleInput, details.role);
        await this.selectDropdown(this.statusDropdown, details.status);
    }

    async submitUpdate() {
        await this.updateButton.scrollIntoView();
        await this.updateButton.click();
    }
    
    async verifySuccessMessage() {
        await this.successMessage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Success message did not appear after 10 seconds'
        });
        const text = await this.successMessage.getText();
        await expect(text).toBe('Update successful');
    }


    async viewProfile() {
        const profileSelector = '[data-testid="viewProfile"]:nth-of-type(1)';
        await browser.waitUntil(
            async () => $(profileSelector).isDisplayed(),
            { timeout: 5000, timeoutMsg: 'Element not found' }
        );
        await $(profileSelector).click();
    }
}

export default new CandidateProfilePage();