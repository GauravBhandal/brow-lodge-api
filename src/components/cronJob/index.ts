import { clientDocumentService } from "../../api/clientDocument";
import { staffDocumentService } from "../../api/staffDocument";
import sendEmail from "../../components/email";
import { formatDateToString } from "../../utils/shiftGenerator";
import { getTemplateContent } from "../email/alertEmailTemplate";


const cronJob = () => {
    console.log("running a task every 24 hours");
    notifyStaffDocuments();
    notifyClientDocuments();
};
const notifyStaffDocuments = () => {
    staffDocumentService.getExpiredStaffDocuments(28).then((documentsExpiresIn28Days) => {

        documentsExpiresIn28Days.forEach(document => {
            if (document.Staff?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/staff/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 28 days!', contentArray, url, 'document upload reminder')
                sendEmail([document.Staff?.email], emailBody, "Staff document is about to expire in 28 days")
            }
        })
    })

    staffDocumentService.getExpiredStaffDocuments(14).then((documentsExpiresIn14Days) => {


        documentsExpiresIn14Days.forEach(document => {
            if (document.Staff?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/staff/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 14 days!', contentArray, url, 'document upload reminder')
                sendEmail([document.Staff?.email], emailBody, "Staff document is about to expire in 14 days")
            }
        })
    })

    staffDocumentService.getExpiredStaffDocuments(7).then((documentsExpiresIn7Days) => {

        documentsExpiresIn7Days.forEach(document => {
            if (document.Staff?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/staff/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 7 days!', contentArray, url, 'document upload reminder')
                sendEmail([document.Staff?.email], emailBody, "Staff document is about to expire in 7 days")
            }
        })
    })

    staffDocumentService.getExpiredStaffDocuments(1).then((documentsExpiresIn1Day) => {
        documentsExpiresIn1Day.forEach(document => {
            if (document.Staff?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/staff/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 24 hours!', contentArray, url, 'document upload reminder')
                sendEmail([document.Staff?.email], emailBody, "Staff document is about to expire in 24 hours")
            }
        })
    })

}

const notifyClientDocuments = () => {
    clientDocumentService.getExpiredClientDocuments(28).then((documentsExpiresIn28Days) => {
        documentsExpiresIn28Days.forEach(document => {
            if (document.Client?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/participant/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 28 days!', contentArray, url, 'document upload reminder')
                sendEmail([document.Client?.email], emailBody, "Participant document is about to expire in 28 days")
            }
        })
    })

    clientDocumentService.getExpiredClientDocuments(14).then((documentsExpiresIn14Days) => {
        documentsExpiresIn14Days.forEach(document => {
            if (document.Client?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/participant/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 14 days!', contentArray, url, 'document upload reminder')
                sendEmail([document.Client?.email], emailBody, "Participant document is about to expire in 14 days")
            }
        })
    })

    clientDocumentService.getExpiredClientDocuments(7).then((documentsExpiresIn7Days) => {
        documentsExpiresIn7Days.forEach(document => {
            if (document.Client?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/participant/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 7 days!', contentArray, url, 'document upload reminder')
                sendEmail([document.Client?.email], emailBody, "Participant document is about to expire in 7 days")
            }
        })
    })

    clientDocumentService.getExpiredClientDocuments(1).then((documentsExpiresIn1Day) => {
        documentsExpiresIn1Day.forEach(document => {
            if (document.Client?.email) {
                const contentArray: { label: string, value: string }[] = [
                    { label: 'Type', value: `${document.Type?.name}` },
                    { label: 'Category', value: `${document.Category?.name}` },
                    { label: 'Expiry Date', value: formatDateToString(document.expiryDate, '', 'DD-MMM-YYYY') },
                ]
                const url = `/participant/documents/${document.id}`
                const emailBody = getTemplateContent('Document Upload Reminder', 'A document with following details expires within 24 hours!', contentArray, url, 'document upload reminder')
                sendEmail([document.Client?.email], emailBody, "Participant document is about to expire in 24 hours")
            }
        })
    })

}

export default cronJob;
