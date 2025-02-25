import Page from '../page';

class ProfilePage extends Page {

    get logoUploadField() { return $('[aria-label="edit"]') }
    get uploadedLogo() { return $('[data-testid="uploaded-logo"]') }
    get oldPasswordInput() { return $('[id="oldPassword"]') }
    get newPasswordInput() { return $('[id="newPassword"]') }
    get confirmPasswordInput() { return $('[id="confirmNewPassword"]') }
    get confirmButton() { return $('[type="submit"]') }
    get fileInput() { return $('[aria-label="file-input"]') }
    get fileInputSubmit() { return $('button[aria-label="update"]') }
    get companyLogo() { return $('[aria-label="company-logo"]') }
    get toastMessage() { return $('div[role="alert"] div:nth-child(2)') }
    get oldPasswordErrorMessage() { return $('[data-testid="change-password"] > form > div:nth-child(2) > p') }
    get newPasswordErrorMessage() { return $('[data-testid="change-password"] > form > div:nth-child(3) > p') }
    get confirmPasswordErrorMessage() { return $('[data-testid="change-password"] > form > div:nth-child(4) > p') }

    async uploadLogo(logoPath: string) {
        await this.logoUploadField.setValue(logoPath);
        await browser.waitUntil(
            async () => await this.uploadedLogo.isDisplayed(),
            {
                timeout: 10000,
                timeoutMsg: 'Logo upload failed or timed out'
            }
        );
    }

    async updatePassword(passwordData: {
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    }) {
        await this.confirmButton.scrollIntoView();
        await this.oldPasswordInput.setValue(passwordData.oldPassword);
        await this.newPasswordInput.setValue(passwordData.newPassword);
        await this.confirmPasswordInput.setValue(passwordData.confirmPassword);
        await browser.keys('Tab');
    }

    async verifyToastMessage(text: string) {
        await this.toastMessage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Success message did not appear after 10 seconds'
        });
        const toastText = await this.toastMessage.getText();
        await expect(toastText).toContain(text);
    }
}

export default new ProfilePage();