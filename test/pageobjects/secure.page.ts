import { $ } from '@wdio/globals'
import Page from './page.js';

class SecurePage extends Page {
    get flashAlert() { return $('#flash'); }
    get userNameInput() { return $('input[name="username"]'); }
    get passwordInput() { return $('input[name="password"]'); }
    get loginSbmitButton() { return $('button[type="submit"]'); }
}

export default new SecurePage();
