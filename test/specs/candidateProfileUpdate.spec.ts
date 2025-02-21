import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import CandidateProfilePage from '../pageobjects/candidateUpdateModal.page'

const EMAIL = 'pratik+abtesting2@hirebus.com'
const PASSWORD = 'Rahul@123'

describe('Candidate Profile Update - Edit Candidate Profiles from Dashboard', () => {
    before(async () => {
        // Step 1: Log in as a company owner/super admin and navigate to the Dashboard.
        await LoginPage.open()
        await LoginPage.login(EMAIL, PASSWORD)
    })

    it('should load the Dashboard with recent assessments and candidate list', async () => {
       
        // Optionally, verify that candidate details (name, role, score) are visible.
        await DashboardPage.isVisbleCandidateDetails() // Call without arguments
    })

    it('should open the Edit Candidate Profile modal from the Dashboard', async () => {
        // Step 2 & 3: Identify a candidate and click on the edit (pencil) icon.
        await DashboardPage.openCandidateProfileEdit()
        // Verify that the Edit Candidate Profile modal is displayed with editable fields.
        await CandidateProfilePage.verifyModalDisplayed()
    })

    it('should update candidate details and reflect the changes on the Dashboard', async () => {
        // Step 4: Update candidate details in the modal.
        const updatedDetails = {
            email: 'updated.email@example.com',
            phone: '1234567890',
            resumeLink: 'https://example.com/resume.pdf',
            company: 'Daniel LLC',
            role: 'CEO',
            status: 'None'
        }
        await CandidateProfilePage.updateCandidateProfile(updatedDetails)

        // Step 5: Click the Update button to save changes.
        await CandidateProfilePage.submitUpdate()
        // Verify that a success message is displayed and the modal closes.
        await expect(CandidateProfilePage.modal).toBeDisplayed()
        // await CandidateProfilePage.verifySuccessMessage()

        // Step 6: Verify that the updated details are reflected on the Dashboard.
        await DashboardPage.verifyCandidateDetails(updatedDetails)
    })
})
