import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/home/dashboard.page'
import candidatesPage from '../pageobjects/candidates/candidates.page'
import loginPage from '../pageobjects/login.page'
import profilePage from '../pageobjects/home/profile.page'

const SUPERADMIN = {
    email: 'superadmin@hirebus.com',
    password: 'Passw0rd!'
}

const COMPANY_USER = {
    email: 'pratik+240225604@hirebus.com',
    password: 'Savan@123'
}

const EMAIL = 'pratik+abtesting2@hirebus.com'
const PASSWORD = 'Rahul@123'

before(async () => {
    await LoginPage.open()
    await LoginPage.login(EMAIL, PASSWORD)
    await DashboardPage.isVisbleCandidateDetails()
})

// describe('Verify deep link functionality for Resume tab', () => {
//     const candidateName = 'Pratik Test'
//     const candidateEmail = 'pratik+test@hirebus.com'

//     const noResumeCandidateName = 'Pratik Test 2'
//     const noResumeCandidateEmail = 'pratik+test2@hirebus.com'

//     async function login(url: string, email: string, password: string) {
//         await browser.url(url)

//         await loginPage.emailInput.waitForDisplayed();
//         await loginPage.emailInput.setValue(email);

//         await loginPage.passwordInput.waitForDisplayed();
//         await loginPage.passwordInput.setValue(password);

//         await loginPage.loginButton.waitForClickable();
//         await loginPage.loginButton.click();

//         await candidatesPage.resumeTab.waitForDisplayed();
//     }

//     it('should verify deep link functionality for Superadmin when candidate has resume', async () => {
//         // Step 1: Navigate to candidates page and verify URL and profile container
// await DashboardPage.hamburgerMenu.click();
// await DashboardPage.candidateLink.click();
// await candidatesPage.firstCandidateName.waitForDisplayed();
// await expect(browser).toHaveUrl(`${process.env.BASE_URL}/candidates?pageIndex=0&pageSize=10`);
// await expect(candidatesPage.profileContainer).toBeDisplayed();

//         // Step 2: Search for candidate and click on the candidate's name
//         await candidatesPage.searchInput.setValue(candidateEmail);
//         await browser.keys('Enter');
//         const candidateElement = $(`//span[contains(text(), '${candidateName}')]`);
//         await candidateElement.waitForDisplayed();
//         await candidateElement.click();

//         // Step 3: Click Resume tab, verify its content is displayed, and capture the URL
//         await candidatesPage.resumeTab.click();
//         await expect(candidatesPage.resumeContent).toBeDisplayed();
//         const resumeTabUrl = await browser.getUrl();
//         expect(resumeTabUrl).toContain('active_tab=resume');
//         await DashboardPage.logout();

//         await browser.url(resumeTabUrl);
//         await expect(LoginPage.emailInput).toBeDisplayed();
//         await login(resumeTabUrl, SUPERADMIN.email, SUPERADMIN.password);
//         await expect(candidatesPage.resumeTab).toBeDisplayed();
//         await expect(candidatesPage.resumeContent).toBeDisplayed();
//         await DashboardPage.logout();

//         await browser.url(resumeTabUrl);
//         await expect(LoginPage.emailInput).toBeDisplayed();
//         await login(resumeTabUrl, COMPANY_USER.email, COMPANY_USER.password);
//         await expect(candidatesPage.resumeTab).toBeDisplayed();
//         await expect(candidatesPage.resumeContent).toBeDisplayed();
//         await DashboardPage.logout();
//     });



//     it('should verify deep link functionality for Superadmin when candidate has no resume', async () => {
//         // Step 1: Navigate to candidates page and verify URL and profile container
//         await DashboardPage.hamburgerMenu.click();
//         await DashboardPage.candidateLink.click();
//         await candidatesPage.firstCandidateName.waitForDisplayed();
//         await expect(browser).toHaveUrl(`${process.env.BASE_URL}/candidates?pageIndex=0&pageSize=10`);
//         await expect(candidatesPage.profileContainer).toBeDisplayed();

//         // Step 2: Search for candidate and click on the candidate's name
//         await candidatesPage.searchInput.setValue(noResumeCandidateEmail);
//         await browser.keys('Enter');
//         const candidateElement = $(`//span[contains(text(), '${noResumeCandidateName}')]`);
//         await candidateElement.waitForDisplayed();
//         await candidateElement.click();

//         // Step 3: Click Resume tab, verify its content is displayed, and capture the URL
//         await candidatesPage.resumeTab.click();
//         await expect(candidatesPage.noResumeMessage).toBeDisplayed();
//         const resumeTabUrl = await browser.getUrl();
//         expect(resumeTabUrl).toContain('active_tab=resume');
//         await DashboardPage.logout();

//         await browser.url(resumeTabUrl);
//         await expect(LoginPage.emailInput).toBeDisplayed();
//         await login(resumeTabUrl, SUPERADMIN.email, SUPERADMIN.password);
//         await expect(candidatesPage.resumeTab).toBeDisplayed();
//         await expect(candidatesPage.noResumeMessage).toBeDisplayed();
//         await DashboardPage.logout();

//         await browser.url(resumeTabUrl);
//         await expect(LoginPage.emailInput).toBeDisplayed();
//         await login(resumeTabUrl, COMPANY_USER.email, COMPANY_USER.password);
//         await expect(candidatesPage.resumeTab).toBeDisplayed();
//         await expect(candidatesPage.noResumeMessage).toBeDisplayed();
//         await DashboardPage.logout();
//     });

// })

// Pending: When redirect with invalid candidate id, it should not show the message instead of creash after 10 second
// describe('Verify invalid/unauthorized deep link handling for Resume tab', () => {
//     const validCandidateName = 'Pratik Test'
//     const validCandidateEmail = 'pratik+test@hirebus.com'
//     let validResumeUrl: string

//     async function captureValidResumeUrl() {
//         // Navigate to candidates and get valid URL
//         await DashboardPage.hamburgerMenu.click()
//         await DashboardPage.candidateLink.click()
//         await candidatesPage.firstCandidateName.waitForDisplayed()
//         await expect(browser).toHaveUrl(`${process.env.BASE_URL}/candidates?pageIndex=0&pageSize=10`)

//         await candidatesPage.searchInput.setValue(validCandidateEmail)
//         await browser.keys('Enter')
//         await $(`//span[contains(text(), '${validCandidateName}')]`).waitForDisplayed()
//         await $(`//span[contains(text(), '${validCandidateName}')]`).click()

//         await candidatesPage.resumeTab.click()
//         validResumeUrl = await browser.getUrl()
//         await DashboardPage.logout()
//     }


//     it('should handle invalid candidate ID in deep link gracefully', async () => {
//         await captureValidResumeUrl()

//         // Create invalid URL by modifying candidate ID
//         const invalidResumeUrl = validResumeUrl.replace(/survey-results\/\d+/, 'survey-results/99999999')

//         // Try accessing invalid URL
//         await browser.url(invalidResumeUrl)
//         await expect(LoginPage.emailInput).toBeDisplayed()
//         await LoginPage.login(SUPERADMIN.email, SUPERADMIN.password)

//         // Verify graceful handling
//         await expect(candidatesPage.errorMessage).toBeDisplayed()
//         const errorText = await candidatesPage.errorMessage.getText()
//         expect(errorText).toContain('not found') // Adjust based on your actual error message
//     })

//     it('should handle unauthorized access attempt by company user gracefully', async () => {
//         // Get URL of candidate not belonging to company user
//         await LoginPage.open()
//         await LoginPage.login(SUPERADMIN.email, SUPERADMIN.password)
//         await captureValidResumeUrl()

//         // Try accessing as company user
//         await browser.url(validResumeUrl)
//         await expect(LoginPage.emailInput).toBeDisplayed()
//         await LoginPage.login(COMPANY_USER.email, COMPANY_USER.password)

//         // Verify unauthorized access handling
//         await expect(candidatesPage.unauthorizedMessage).toBeDisplayed()
//         const errorText = await candidatesPage.unauthorizedMessage.getText()
//         expect(errorText).toContain('unauthorized') // Adjust based on your actual error message

//         // Verify redirect to home/404
//         await expect(browser).toHaveUrlContaining('/home')
//     })
// })

describe('Verify Send Assessment functionality', () => {
    const validData = {
        firstName: 'John',
        lastName: 'Doe',
        type: 'Candidate',
        email: 'pratik+abtesting2@hirebus.com',
        role: 'Test Pratik'
    }

    const invalidData = {
        firstName: 'John123!@#',
        lastName: 'Doe456$%^',
        email: 'invalid.email@@test.com',
        role: 'Software Engineer'
    }

    it('should verify candidate details section is displayed', async () => {
        await DashboardPage.hamburgerMenu.click();
        await DashboardPage.candidateLink.click();
        await candidatesPage.firstCandidateName.waitForDisplayed();
        await expect(browser).toHaveUrl(`${process.env.BASE_URL}/candidates?pageIndex=0&pageSize=10`);
        await expect(candidatesPage.profileContainer).toBeDisplayed();

        await candidatesPage.sendAssessmentButton.click()
        await expect(candidatesPage.sendAssessmentModal).toBeDisplayed()
        console.log(`Modal is displayed: ${await candidatesPage.sendAssessmentModal.isDisplayed()}`);
        expect(candidatesPage.candidateRadioButton).toBeExisting()
        expect(candidatesPage.employeeRadioButton).toBeExisting()
        expect(candidatesPage.roleDropdown).toBeExisting()
        expect(candidatesPage.departmentDropdown).toBeExisting()
        expect(candidatesPage.locationDropdown).toBeExisting()
        expect(candidatesPage.languageDropdown).toBeExisting()
        expect(candidatesPage.firstNameInput).toBeExisting()
        expect(candidatesPage.lastNameInput).toBeExisting()
        expect(candidatesPage.emailInput).toBeExisting()

        await candidatesPage.sendAssessmentSubmitButton.scrollIntoView()
        await candidatesPage.sendAssessmentSubmitButton.click()
        expect(candidatesPage.selectTypeValidation).toBeExisting()
        expect(candidatesPage.roleValidation).toBeExisting()
        expect(candidatesPage.firstNameValidation).toBeExisting()
        expect(candidatesPage.lastNameValidation).toBeExisting()
        expect(candidatesPage.emailValidation).toBeExisting()

        await candidatesPage.candidateRadioButton.click()
        await candidatesPage.roleDropdown.setValue(validData.role)
        await browser.keys('Enter')

        await candidatesPage.firstNameInput.setValue(validData.firstName)
        await candidatesPage.lastNameInput.setValue(validData.lastName)
        await candidatesPage.emailInput.setValue(validData.email)
        await browser.keys('Tab')

        await candidatesPage.sendAssessmentSubmitButton.waitForDisplayed()
        await candidatesPage.sendAssessmentSubmitButton.waitForClickable()
        await candidatesPage.sendAssessmentSubmitButton.click()
        
        // const toastMessage = await $('//div[@role="alert"]//div[2]').getText()
        // console.log(`Toast message: ${toastMessage}`)
        // await expect(toastMessage).toContain('Assessment successfully sent')

        await profilePage.verifyToastMessage('Assessment successfully sent')

    })

    it('should verify English language survey link opens correctly', async () => {
        await candidatesPage.sendAssessmentButton.click()
        await expect(candidatesPage.sendAssessmentModal).toBeDisplayed()

        await candidatesPage.fillAssessmentForm({
            ...validData,
            language: 'English'
        })
        const surveyLink = await candidatesPage.getSurveyLink()

        // Store current URL to return later
        const originalUrl = await browser.getUrl()

        // Navigate to survey link directly
        await browser.url(surveyLink)
        await expect($(`[data-testid="Let’s Go!"]`)).toBeDisplayed()

        // Return to original page
        await browser.url(originalUrl)
    })


    it('should verify Spanish language survey link opens correctly', async () => {
        await candidatesPage.sendAssessmentButton.click()
        await expect(candidatesPage.sendAssessmentModal).toBeDisplayed()

        await candidatesPage.fillAssessmentForm({
            ...validData,
            language: 'Español'
        })
        const surveyLink = await candidatesPage.getSurveyLink()
        
        // Store current URL to return later
        const originalUrl = await browser.getUrl()

        // Navigate to survey link directly
        await browser.url(surveyLink)
        await expect($(`[data-testid="¡Vamos!"]`)).toBeDisplayed()

        // Return to original page
        await browser.url(originalUrl)
    })

    it('should show validation for invalid name formats', async () => {
        await candidatesPage.sendAssessmentButton.click()
        await expect(candidatesPage.sendAssessmentModal).toBeDisplayed()

        await candidatesPage.fillAssessmentForm({
            ...invalidData,
            email: validData.email
        })
        await expect(candidatesPage.firstNameValidation).toBeDisplayed()
        await expect(candidatesPage.lastNameValidation).toBeDisplayed()
    })

    it('should show validation for invalid email format', async () => {
        await candidatesPage.sendAssessmentButton.click()
        await expect(candidatesPage.sendAssessmentModal).toBeDisplayed()

        await candidatesPage.fillAssessmentForm({
            ...validData,
            email: invalidData.email
        })
        await expect(candidatesPage.emailValidation).toHaveText('Valid Email Address is required')
    })

    afterEach(async () => {
        // Close modal if it's still open
        if (await candidatesPage.sendAssessmentModal.isDisplayed()) {
            await candidatesPage.closeModalButton.click()
        }
    })
})
