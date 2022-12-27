import { staffDocumentService } from "../../api/staffDocument";

const cronJob = () => {
    console.log("running a task every 10 second");
};

const notifyStaffDocuments = () => {
    const props = {

        where: { expiryDate_lt: '2022-12-25T00:00:00+05:30', archived_eq: 'false' }
    }
    const expiredDocuments = staffDocumentService.getStaffDocuments();
}

export default cronJob;
