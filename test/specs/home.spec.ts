import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/home/dashboard.page'
import CandidateProfilePage from '../pageobjects/home/candidateEditModal.page'
import ProfilePage from '../pageobjects/home/profile.page'
import { getClipboardText } from '../utils/utils'

const EMAIL = 'pratik+abtesting2@hirebus.com'
const PASSWORD = 'Rahul@123'
const GET_TESTING_LINK = {
    url: `https://${process.env.ENVIRONMENT}.hirebus.com/survey/register`,
    companyName: 'AB Testing', companyValue: 'abtesting2',
    role: 'COO', languageName: 'English', languageValue: 'en'
}

before(async () => {
    await LoginPage.open()
    await LoginPage.login(EMAIL, PASSWORD)
    await DashboardPage.isVisbleCandidateDetails()
})

describe('Verify that company owners can edit candidate profiles directly from the dashboard', () => {
    it('should open the Edit Candidate Profile modal from the Dashboard', async () => {
        await DashboardPage.openCandidateProfileEdit()
        await CandidateProfilePage.verifyModalDisplayed()
    })

    it('should update candidate details and reflect the changes on the Dashboard', async () => {
        const updatedDetails = {
            email: 'updated.email@example.com',
            phone: '1234567890',
            resumeLink: 'https://example.com/resume.pdf',
            company: 'Daniel LLC',
            role: 'CEO',
            status: 'None'
        }
        await CandidateProfilePage.updateCandidateProfile(updatedDetails)
        await CandidateProfilePage.submitUpdate()
        await expect(CandidateProfilePage.modal).toBeDisplayed()
        await CandidateProfilePage.verifySuccessMessage()
        await DashboardPage.verifyCandidateDetails(updatedDetails)
    })
})


describe('Verify that pagination works properly', () => {
    let totalRecords: number;

    before(async () => {
        const selectedRecordsPerPage = parseInt(await DashboardPage.selectedRecordsPerPage.getValue());
        expect(selectedRecordsPerPage).toBe(10);

        await DashboardPage.goToLastPage();
        await DashboardPage.isVisbleCandidateDetails();
        const recordsOnLastPage = await DashboardPage.getCurrentPageRecordsCount();
        const totalPages = await DashboardPage.getTotalPages();

        totalRecords = ((totalPages - 1) * selectedRecordsPerPage) + recordsOnLastPage;

        console.log(`--- Total Records: ${totalRecords}`);
    })

    it('records distribution should be working properly for each selected records per page', async () => {
        const recordsPerPageList = [10, 20, 30, 50];

        for (const recordsPerPage of recordsPerPageList) {
            console.log(`--- Records Per Page: ${recordsPerPage}`);

            await DashboardPage.goToFirstPage();
            await DashboardPage.recordsPerPageDropdown.waitForDisplayed({ timeout: 20000 });
            await DashboardPage.recordsPerPageDropdown.selectByAttribute('value', recordsPerPage.toString());
            await DashboardPage.isVisbleCandidateDetails();

            const expectedTotalPages = Math.ceil(totalRecords / recordsPerPage);
            const actualTotalPages = await DashboardPage.getTotalPages();
            expect(actualTotalPages).toBe(expectedTotalPages);

            await DashboardPage.goToLastPage();
            await DashboardPage.isVisbleCandidateDetails();
            const expectedRecordsOnLastPage = totalRecords % recordsPerPage;
            const actualRecordsOnLastPage = await DashboardPage.getCurrentPageRecordsCount();
            expect(actualRecordsOnLastPage).toBe(expectedRecordsOnLastPage);
        }
    })


    it('verify focus on the "Go to page:" input box when clicked', async () => {
        const goToPageInput = DashboardPage.gotoPageDropdown;
        await goToPageInput.click(); // Click on the input box
        const isFocused = await goToPageInput.isFocused(); // Check if the input box is focused
        expect(isFocused).toBe(true); // Ensure the input field is focused
    });

    it('should handle invalid page numbers gracefully', async () => {
        const totalPages = await DashboardPage.getTotalPages();
        const invalidPageNumber = totalPages + 1;

        console.log(`--- Total Pages: ${totalPages}`);
        console.log(`--- Invalid Page Number: ${invalidPageNumber}`);

        let errorCaught = false;
        try {
            // Attempt to select an invalid option
            await DashboardPage.gotoPageDropdown.selectByAttribute('value', invalidPageNumber.toString());
        } catch (error: any) {
            errorCaught = true;
            // Verify that the error message contains the expected text
            expect(error.message).toContain(`Option with attribute "value=${invalidPageNumber}" not found`);
        }

        if (!errorCaught) {
            // If no error is thrown, verify that the current page remains valid
            const currentPage = await DashboardPage.getCurrentPageNumber();
            expect(currentPage).toBeLessThanOrEqual(totalPages);
        }
    });


    it('verify navigate to the 2nd page when the Next button is clicked from the 1st page', async () => {
        await DashboardPage.firstPageButton.click(); // Navigate to the first page
        await DashboardPage.nextPageButton.click(); // Click on the Next button
        const currentPage = await DashboardPage.getCurrentPageNumber();
        expect(currentPage).toBe(2); // Ensure it navigates to the second page
    });

    it('verify navigate to the last page when the Last page button is clicked', async () => {
        const totalPages = await DashboardPage.getTotalPages();
        await DashboardPage.lastPageButton.click(); // Click on the Last Page button
        const currentPage = await DashboardPage.getCurrentPageNumber();
        expect(currentPage).toBe(totalPages); // Ensure it navigates to the last page
    });

    it('verify navigate to the previous page when the Previous page button is clicked', async () => {
        const currentPageBefore = await DashboardPage.getCurrentPageNumber();
        await DashboardPage.previousPageButton.click(); // Click on the Previous Page button
        const currentPageAfter = await DashboardPage.getCurrentPageNumber();
        expect(currentPageAfter).toBe(currentPageBefore - 1); // Ensure it navigates to the previous page
    });

    it('verify navigate to the first page when the First page button is clicked', async () => {
        await DashboardPage.lastPageButton.click(); // First navigate to the last page
        await DashboardPage.firstPageButton.click(); // Click on the First Page button
        const currentPage = await DashboardPage.getCurrentPageNumber();
        expect(currentPage).toBe(1); // Ensure it navigates to the first page
    });
});

// Pending: Upload an invalid logo and verify the error message
describe('Verify user can not update the profile with invalid inputs', () => {
    it('verify display profile options when clicking profile button', async () => {
        await DashboardPage.profileButton.click()
        await expect(DashboardPage.profileOption).toBeDisplayed()
        await expect(DashboardPage.logoutOption).toBeDisplayed()
    })

    it('verify navigate to profile page and display all required fields', async () => {
        await DashboardPage.profileOption.click()
        await expect(ProfilePage.logoUploadField).toBeDisplayed()
        await expect(ProfilePage.oldPasswordInput).toBeDisplayed()
        await expect(ProfilePage.newPasswordInput).toBeDisplayed()
        await expect(ProfilePage.confirmPasswordInput).toBeDisplayed()

        await $('(//html)[1]').click()
    })

    // it('verify display validation message when uploading invalid logo', async () => {
    //     // Click on the logo upload field to trigger file input
    //     await ProfilePage.logoUploadField.click();

    //     // Set path to an oversized test image file
    //     const invalidLogoPath = path.join(__dirname, '../fixtures/invalid_large_logo.png');
    //     await ProfilePage.fileInput.setValue(invalidLogoPath);

    //     // Submit the file upload form
    //     await ProfilePage.fileInputSubmit.click();

    //     // Verify validation message appears
    //     await expect(ProfilePage.errorMessage).toBeDisplayed();
    //     await expect(ProfilePage.errorMessage).toHaveText('File size exceeds maximum allowed limit');

    //     // Verify submit button is not stuck in loading state
    //     await expect(ProfilePage.fileInputSubmit).not.toHaveText('Updating...');
    // })

    it('verify display error message when field are empty', async () => {
        const passwordData = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }

        await ProfilePage.updatePassword(passwordData)
        await ProfilePage.confirmButton.scrollIntoView();
        await ProfilePage.confirmButton.click();
        await expect(ProfilePage.oldPasswordErrorMessage).toBeDisplayed();
        await expect(ProfilePage.newPasswordErrorMessage).toBeDisplayed();
    })

    it('verify display error message when invalid inputs for the old password field', async () => {
        const passwordData = {
            oldPassword: 'incorrect_password',
            newPassword: 'Rahul@1234',
            confirmPassword: 'Rahul@1234'
        }

        await ProfilePage.updatePassword(passwordData)
        await ProfilePage.confirmButton.scrollIntoView();
        await ProfilePage.confirmButton.click();
        await ProfilePage.verifyToastMessage('Incorrect username or password.');
    })

    it('verify display error message when invalid inputs for the password field', async () => {
        const passwordData = {
            oldPassword: PASSWORD,
            newPassword: 'Rahul',
            confirmPassword: 'Rahul'
        }

        await ProfilePage.updatePassword(passwordData)
        const newPasswordErrorMessage = await ProfilePage.newPasswordErrorMessage.getText()
        await expect(newPasswordErrorMessage).toContain('Password must be at least 8 characters');
    })

    it('verify display error message when new password and confirm password are not same', async () => {
        const passwordData = {
            oldPassword: PASSWORD,
            newPassword: 'Rahul@123',
            confirmPassword: 'Rahul@1234'
        }

        await ProfilePage.updatePassword(passwordData)
        const confirmPasswordErrorMessage = await ProfilePage.confirmPasswordErrorMessage.getText()
        await expect(confirmPasswordErrorMessage).toContain('Passwords do not match');
    })


    it('verify successfully update password with valid inputs', async () => {
        const passwordData = {
            oldPassword: PASSWORD,
            newPassword: 'Rahul@123',
            confirmPassword: 'Rahul@123'
        }

        await ProfilePage.updatePassword(passwordData)

        await ProfilePage.confirmButton.scrollIntoView();
        await ProfilePage.confirmButton.click();
        await ProfilePage.verifyToastMessage('Password changed successfully');
    })
})

// Pending: verify successfully upload valid logo
describe('Verify user can update the profile successfully with valid inputs', () => {
    it('verify display profile options when clicking profile button', async () => {
        await DashboardPage.profileButton.click()
        await expect(DashboardPage.profileOption).toBeDisplayed()
        await expect(DashboardPage.logoutOption).toBeDisplayed()
    })

    it('verify navigate to profile page and display all required fields', async () => {
        await DashboardPage.profileOption.click()
        await expect(ProfilePage.logoUploadField).toBeDisplayed()
        await expect(ProfilePage.oldPasswordInput).toBeDisplayed()
        await expect(ProfilePage.newPasswordInput).toBeDisplayed()
        await expect(ProfilePage.confirmPasswordInput).toBeDisplayed()

        await $('(//html)[1]').click()
    })

    // it('verify successfully upload valid logo', async () => {
    //     const validLogoPath = path.join(__dirname, '../fixtures/valid_logo.png')
    //     await ProfilePage.logoUploadField.click()
    //     await ProfilePage.fileInput.setValue(validLogoPath)
    //     await ProfilePage.fileInputSubmit.click()
    //     await ProfilePage.verifyToastMessage('Logo updated successfully')
    // })

    it('verify successfully update password with valid inputs', async () => {
        const passwordData = {
            oldPassword: PASSWORD,
            newPassword: 'Rahul@123',
            confirmPassword: 'Rahul@123'
        }

        await ProfilePage.updatePassword(passwordData)
        await ProfilePage.confirmButton.scrollIntoView()
        await ProfilePage.confirmButton.click()
        await ProfilePage.verifyToastMessage('Password changed successfully')
    })
})


describe('Verify user is logged out after clicking "Logout" button', () => {
    it('verify display Profile and Logout options when clicking profile button', async () => {
        await DashboardPage.profileButton.click()
        await expect(DashboardPage.profileOption).toBeDisplayed()
        await expect(DashboardPage.logoutOption).toBeDisplayed()
    })

    it('verify redirect to login page after clicking logout', async () => {
        await DashboardPage.logoutOption.click()
        await expect(LoginPage.emailInput).toBeDisplayed()
    })
})

// Pending: Allow permissions for clipboard read and write
describe('Verify the user can generate the Testing Link with the "Get Testing Link" button', () => {

    it('should display and open Get Testing Link modal', async () => {
        await expect(DashboardPage.getTestingLinkButton).toBeDisplayed()
        await DashboardPage.getTestingLinkButton.click()
        await expect(DashboardPage.modal).toBeDisplayed()
    })

    it('should display all required fields in the modal', async () => {
        await expect(DashboardPage.roleDropdown).toBeDisplayed()
        await expect(DashboardPage.languageDropdown).toBeDisplayed()
        await expect(DashboardPage.linkTextbox).toBeDisplayed()
        await expect(DashboardPage.copyLinkButton).toBeDisplayed()
    })

    it('should display correct base testing link', async () => {
        await DashboardPage.companyName.setValue(GET_TESTING_LINK.companyName)
        await browser.keys('Enter')

        const expectedBaseLink = `${GET_TESTING_LINK.url}?co=${GET_TESTING_LINK.companyValue}`
        const actualLink = await DashboardPage.linkTextbox.getText()
        expect(actualLink).toBe(expectedBaseLink)
    })

    it('should copy link to clipboard', async () => {
        await DashboardPage.copyLinkButton.click()

        const clipboardText = await getClipboardText();
        const linkText = await DashboardPage.linkTextbox.getText();
        expect(clipboardText).toBe(linkText)
    })

    it('should update link when role is selected', async () => {
        await DashboardPage.roleDropdown.setValue(GET_TESTING_LINK.role)
        await browser.keys('Enter')

        const expectedLink = `${GET_TESTING_LINK.url}?co=${GET_TESTING_LINK.companyValue}&position=${encodeURIComponent(GET_TESTING_LINK.role)}`
        const actualLink = await DashboardPage.linkTextbox.getText()
        expect(actualLink).toBe(expectedLink)

        await DashboardPage.copyLinkButton.click()
        const clipboardText = await getClipboardText();
        const linkText = await DashboardPage.linkTextbox.getText();
        expect(clipboardText).toBe(linkText)
    })


    it('should update link when language is selected', async () => {
        await DashboardPage.languageDropdown.setValue(GET_TESTING_LINK.languageName)
        await browser.keys('Enter')

        const expectedLink = `${GET_TESTING_LINK.url}?co=${GET_TESTING_LINK.companyValue}&position=${GET_TESTING_LINK.role}&lang=${GET_TESTING_LINK.languageValue}`
        const actualLink = await DashboardPage.linkTextbox.getText()
        expect(actualLink).toBe(expectedLink)

        await DashboardPage.copyLinkButton.click()
        const clipboardText = await getClipboardText();
        const linkText = await DashboardPage.linkTextbox.getText();
        expect(clipboardText).toBe(linkText)
    })

    it('should remove position parameter when role is cleared', async () => {
        await DashboardPage.clearRoleButton.click()

        const expectedLink = `${GET_TESTING_LINK.url}?co=${GET_TESTING_LINK.companyValue}&lang=${GET_TESTING_LINK.languageValue}`
        const actualLink = await DashboardPage.linkTextbox.getText()
        expect(actualLink).toBe(expectedLink)

        await DashboardPage.copyLinkButton.click()
        const clipboardText = await getClipboardText();
        const linkText = await DashboardPage.linkTextbox.getText();
        expect(clipboardText).toBe(linkText)
    })

    it('should remove language parameter when language is cleared', async () => {
        await DashboardPage.clearLanguageButton.click() 
        await browser.keys('Tab')

        const expectedLink = `${GET_TESTING_LINK.url}?co=${GET_TESTING_LINK.companyValue}`
        const actualLink = await DashboardPage.linkTextbox.getText()
        await expect(actualLink).toBe(expectedLink)

        await DashboardPage.copyLinkButton.click()
        const clipboardText = await getClipboardText()        
        const linkText = await DashboardPage.linkTextbox.getText()
        await expect(clipboardText).toBe(linkText)
    })
})

after(async () => {
    await DashboardPage.logout();
})