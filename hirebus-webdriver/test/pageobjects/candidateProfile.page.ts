import { $ } from '@wdio/globals'

class CandidateProfilePage {
    // Updated modal locator (assuming a data-testid for the edit modal)
    get modal() { return $(`(//div[@data-headlessui-state="open"])[2]`) }

    // Updated input fields using data-testid selectors
    get emailInput() { return $('input[data-testid="email-input"]') }
    get phoneInput() { return $('input[data-testid="phone-input"]') }
    get resumeLinkInput() { return $('input[data-testid="resume-link-input"]') }

    // Assumed testids for these fields based on pattern; update if different
    get companyInput() { return $(`//input[@id='react-select-2-input']`) }
    get roleInput() { return $(`//input[@id='react-select-3-input']`) }

    // Updated dropdown selector using data-testid
    get statusDropdown() { return $(`//input[@id='react-select-4-input']`) }

    // Updated update button locator as per script
    get updateButton() { return $('button[data-testid="update-button"]') }

    // Updated success message locator to use role attribute
    get successMessage() { return $('div[role=“alert”]') }

    async verifyModalDisplayed() {
        await this.modal.waitForDisplayed({ timeout: 10000 })
    }
    // #react-select - 3 - option - 3
    async updateCandidateProfile(details: {
        email: string
        phone: string
        resumeLink: string
        company: string
        role: string
        status: string
    }) {
        await this.emailInput.setValue(details.email)
        await this.phoneInput.setValue(details.phone)
        await this.resumeLinkInput.setValue(details.resumeLink)

        // Click to open the dropdown and enter the company name
        await this.companyInput.click()
        await this.companyInput.setValue(details.company)

        // Wait for the dropdown to load the options after typing the company name
        await browser.pause(500)  // Optional: a small pause to ensure dropdown is updated (you can adjust the time)

        // Press Enter to select the option
        await browser.keys('Enter')

        // Repeat the same for the role dropdown (if needed)
        await this.roleInput.click()
        await this.roleInput.setValue(details.role)
        await browser.pause(500)  // Optional: a small pause to ensure dropdown is updated
        await browser.keys('Enter')

        // Repeat for the status dropdown (if needed)
        await this.statusDropdown.click()
        await this.statusDropdown.setValue(details.status)
        await browser.pause(500)  // Optional: a small pause to ensure dropdown is updated
        await browser.keys('Enter')
    }


    async submitUpdate() {
        await this.updateButton.waitForClickable({ timeout: 5000 })
        await this.updateButton.click()
    }

    async verifySuccessMessage() {
        const successMessageText = await this.successMessage.getText();
        expect(successMessageText).toContain('Success');
    }

    async viewProfile() {
        await browser.waitUntil(async () => {
            return (await browser.$('[data-testid="viewProfile"]:nth-of-type(1)')).isDisplayed();
        }, { timeout: 5000, timeoutMsg: 'Element not found' });

        const profileElement = await browser.$('[data-testid="viewProfile"]:nth-of-type(1)');
        await profileElement.click();
    }
}

export default new CandidateProfilePage()


// await page1.goto('https://dev.hirebus.com/');
// await page1.locator(`input[data-testid="email-input"]`).click();
// await page1.locator(`input[data-testid="email-input"]`).fill(`superadmin@hirebus.com`);
// await page1.locator(`input[data-testid="email-input"]`).press(`Tab`);
// await page1.locator(`input[data-testid="password-input"]`).fill(`Passw0rd!`);
// await page1.locator(`button[data-testid="login-button"]`).click();
// await page1.locator(`button:nth-of-type(8)`).click();
// await page1.locator(`input[data-testid="email-input"]`).click();
// await page1.locator(`input[data-testid="phone-input"]`).click();
// await page1.locator(`input[data-testid="resume-link-input"]`).click();
// await page1.locator(`((//div[normalize-space()='Rod - Staging Funnel Global'])[7]//div)[2]`).click();
// await page1.locator(`div:nth-of-type(237)`).click();
// await page1.locator(`((//div[normalize-space()='New'])[4]//div)[2]`).click();
// await page1.locator(`//div/div[2]`).click();
// await page1.locator(`button[data-testid="update-button"]`).click();
// await page1.locator(`input[data-testid="email-input"]`).click();
// await page1.locator(`input[data-testid="email-input"]`).click();
// await page1.locator(`input[data-testid="email-input"]`).fill(`pratik+1223022025@hirebus.com`);
// await page1.locator(`input[data-testid="phone-input"]`).click();
// await page1.locator(`input[data-testid="phone-input"]`).fill(`+9174857485742`);
// await page1.locator(`button[data-testid="update-button"]`).click();
// await page1.locator(`input[data-testid="phone-input"]`).click();
// await page1.locator(`input[data-testid="phone-input"]`).fill(`+917485748542`);
// await page1.locator(`button[data-testid="update-button"]`).click();
// await page1.locator(`input[data-testid="phone-input"]`).press(`ArrowLeft`);
// await page1.locator(`input[data-testid="phone-input"]`).press(`ArrowRight`);
// await page1.locator(`input[data-testid="phone-input"]`).press(`ArrowRight`);
// await page1.locator(`input[data-testid="phone-input"]`).click();
// await page1.locator(`input[data-testid="phone-input"]`).press(`ArrowLeft`);
// await page1.locator(`input[data-testid="phone-input"]`).press(`ArrowRight`);
// await page1.locator(`input[data-testid="phone-input"]`).press(`ArrowRight`);
// await page1.locator(`input[data-testid="phone-input"]`).press(`ArrowLeft`);
// await page1.locator(`input[data-testid="phone-input"]`).fill(`+91748574852`);
// await page1.locator(`input[data-testid="phone-input"]`).press(`Delete`);
// await page1.locator(`input[data-testid="phone-input"]`).fill(`2323232323`);
// await page1.locator(`button[data-testid="update-button"]`).click();
// await expect(page1.locator(`div[role="alert"]`)).toBeVisible();
// await page1.locator(`(//div[normalize-space()='NNS'])[5]`).click();
// await page1.locator(`div[role="menu"] > div:nth-of-type(2)`).click();
// await expect(page1).toHaveURL(`https://dev.hirebus.com/login`);
