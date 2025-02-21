import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import CandidateProfilePage from '../pageobjects/candidateUpdateModal.page'

const EMAIL = 'pratik+abtesting2@hirebus.com'
const PASSWORD = 'Rahul@123'

describe('Candidate Profile Update - Edit Candidate Profiles from Dashboard', () => {
    before(async () => {
        await LoginPage.open()
        await LoginPage.login(EMAIL, PASSWORD)
    })

    it('should load the Dashboard with recent assessments and candidate list', async () => {
        await DashboardPage.isVisbleCandidateDetails() 
    })

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

