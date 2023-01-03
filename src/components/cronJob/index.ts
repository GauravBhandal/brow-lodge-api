import { staffDocumentService } from "../../api/staffDocument";
import sendEmail from "../../components/email";


const cronJob = () => {
    console.log("running a task every 2 mins");
    notifyStaffDocuments();
};
const notifyStaffDocuments = () => {
    staffDocumentService.getExpiredStaffDocuments(30).then((documentsExpiresIn30Days) => {
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

        documentsExpiresIn30Days.forEach(document => {
            if (document.Staff?.email) {
                sendEmail([document.Staff?.email], emailBody, "Staff documents expiry reminder")
            }
        })
    })

    staffDocumentService.getExpiredStaffDocuments(14).then((documentsExpiresIn14Days) => {
        const emailBody = `
        Hi user!
        <br>  
        <br>  
        Staff document will be expired in 14 days!
        <br>
        <br>  
        Best Regards,
        <br>
        Team Care Diary
          `;

        documentsExpiresIn14Days.forEach(document => {
            if (document.Staff?.email) {
                sendEmail([document.Staff?.email], emailBody, "Staff documents expiry reminder")
            }
        })
    })

    staffDocumentService.getExpiredStaffDocuments(14).then((documentsExpiresIn7Days) => {
        const emailBody = `
        Hi user!
        <br>  
        <br>  
        Staff document will be expired in 7 days!
        <br>
        <br>  
        Best Regards,
        <br>
        Team Care Diary
          `;

        documentsExpiresIn7Days.forEach(document => {
            if (document.Staff?.email) {
                sendEmail([document.Staff?.email], emailBody, "Staff documents expiry reminder")
            }
        })
    })

    staffDocumentService.getExpiredStaffDocuments(14).then((documentsExpiresIn1Day) => {
        const emailBody = `
        Hi user!
        <br>  
        <br>  
        Staff document will be expired in 1 day!
        <br>
        <br>  
        Best Regards,
        <br>
        Team Care Diary
          `;

        documentsExpiresIn1Day.forEach(document => {
            if (document.Staff?.email) {
                sendEmail([document.Staff?.email], emailBody, "Staff documents expiry reminder")
            }
        })
    })

    staffDocumentService.getExpiredStaffDocuments(0).then((documentsExpired) => {
        const emailBody = `
        Hi user!
        <br>  
        <br>  
        Staff document are expired!
        <br>
        <br>  
        Best Regards,
        <br>
        Team Care Diary
          `;

        documentsExpired.forEach(document => {
            if (document.Staff?.email) {
                sendEmail([document.Staff?.email], emailBody, "Staff documents expiry reminder")
            }
        })
    })

}

export default cronJob;
