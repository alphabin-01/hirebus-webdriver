import { $ } from '@wdio/globals'

class LoginPage {
    get emailInput() { return $('input[name="email"]') }
    get passwordInput() { return $('input[name="password"]') }
    get loginButton() { return $('button[type="submit"]') }
    get pageTitle() { return $('title') } // Optional: If you want to check the page title element

    async open() {
        await browser.url('https://dev.hirebus.com/login')
    }

    async login(email: string, password: string) {
        // Wait for page to be fully loaded
        await browser.waitUntil(
            async () => await browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 20000,
                timeoutMsg: 'Page did not load completely'
            }
        );

        // Wait for email input to be displayed and interactable
        await this.emailInput.waitForDisplayed();
        await this.emailInput.setValue(email);

        await this.passwordInput.waitForDisplayed({ timeout: 10000 });
        await this.passwordInput.setValue(password);

        await this.loginButton.waitForClickable({ timeout: 10000 });
        await this.loginButton.click();

        // Optional validation after login
        await browser.waitUntil(
            async () => (await browser.getTitle()) === 'HireBus',
            {
                timeout: 10000,
                timeoutMsg: 'Expected page title to be "HireBus" after login',
            }
        )
    }
}

export default new LoginPage()
