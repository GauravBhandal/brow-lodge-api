import { staffDocumentService } from "../../api/staffDocument";
import sendEmail from "../../components/email";


const cronJob = () => {
    console.log("running a task every 2 mins");
    // notifyStaffDocuments();
};
const notifyStaffDocuments = async () => {
    const expiredDocuments = await staffDocumentService.getExpiredStaffDocuments();
    const emailBody = `
      Hi user!
      <br>  
      <br>  
      Staff document will be expired in 30 days!
      <br>
      <br>  
      Best Regards,
      <br>
      Team Care Diary
        `;

    expiredDocuments.forEach(document => {
        if (document.Staff?.email) {
            sendEmail(document.Staff?.email, emailBody)
        }
    })
}

export default cronJob;
