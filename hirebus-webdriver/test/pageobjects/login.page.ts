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
        await this.emailInput.waitForDisplayed()
        await this.emailInput.setValue(email)
        await this.passwordInput.setValue(password)
        await this.loginButton.click()

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
