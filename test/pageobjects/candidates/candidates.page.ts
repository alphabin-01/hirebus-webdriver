class CandidatesPage {

    // Candidates Page
    get searchInput() { return $('input[placeholder="Search here..."]') }
    get profileContainer() { return $('[data-testid="batch-action-toolbar"]') }
    get resumeTab() { return $('//div[@role="tablist"]//div[1]/a[3]') }
    get resumeContent() { return $('[aria-label="resume-preview"]') }
    get noResumeMessage() { return $('[data-testid="no-resume-content"]') }
    get firstCandidateName() { return $('(//div[@data-testid="SurveyResultCard"]//div[2])[1]') }

    // Send Assessment Modal
    get sendAssessmentButton() { return $('button[data-testid="Send Assessment"]') }
    get sendAssessmentModal() { return $('(//div[@data-headlessui-state="open"])[2]') }

    // Send Assessment Modal Fields
    get candidateRadioButton() { return $('button[title="Candidate"]') }
    get employeeRadioButton() { return $('button[title="Employee"]') }
    get roleDropdown() { return $('input[aria-label="role-select"]') }
    get departmentDropdown() { return $('input[aria-label="department-select"]') }
    get locationDropdown() { return $('input[aria-label="location-select"]') }
    get languageDropdown() { return $('input[aria-label="language-select"]') }
    get firstNameInput() { return $('input[name="firstName"]') }
    get lastNameInput() { return $('input[aria-label="last-name-input"]') }
    get emailInput() { return $('input[aria-label="email-input"]') }
    get copyLinkButton() { return $('button[aria-label="copy-custom-test-link-button"]') }
    get sendAssessmentSubmitButton() { return $('button[aria-label="send-assessment-form-button"]') }
    get closeModalButton() { return $('button[title="Close"]') }
    // validation messages
    get selectTypeValidation() { return $('(//form[@aria-label="send-assessment-form"]//div[1]/span)[1]') }
    get roleValidation() { return $('(//form[@aria-label="send-assessment-form"]//div[2]//span)[5]') }
    get firstNameValidation() { return $('(//form[@aria-label="send-assessment-form"]//div[5]//span)[2]') }
    get lastNameValidation() { return $('(//form[@aria-label="send-assessment-form"]//div[6]//span)') }
    get emailValidation() { return $('(//form[@aria-label="send-assessment-form"]//div[7]//span)[2]') }


    async open() {
        await browser.url('/candidates')
    }


    async fillAssessmentForm(data: {
        firstName: string,
        lastName: string,
        email: string,
        role: string,
        type?: string,
        language?: string,
    }) {
        if (data.type === 'Candidate') {
            await this.candidateRadioButton.click()
        } else {
            await this.employeeRadioButton.click()
        }
        if (data.role) { await this.roleDropdown.setValue(data.role);  await browser.keys('Enter') }
        if (data.firstName) { await this.firstNameInput.setValue(data.firstName) }
        if (data.lastName) { await this.lastNameInput.setValue(data.lastName) }
        if (data.email) { await this.emailInput.setValue(data.email) }
        if (data.language) { await this.languageDropdown.setValue(data.language); await browser.keys('Enter') }

        await this.sendAssessmentSubmitButton.waitForDisplayed()
        await this.sendAssessmentSubmitButton.waitForClickable()
        await this.sendAssessmentSubmitButton.click()
    }

    async getSurveyLink() {
        await this.copyLinkButton.click()
        const surveyLink = await browser.execute(() => {
            return navigator.clipboard.readText();
        });
        return surveyLink
    }
}

export default new CandidatesPage() 