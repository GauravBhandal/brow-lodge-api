import ClientContactModel from "./clientContact.model";
import {
  CreateClientContactProps,
  UpdateClientContactProps,
  DeleteClientContactProps,
} from "./clientContact.types";

class ClientContactService {
  async createBulkClientContact(props: CreateClientContactProps[]) {
    const clientContact = await ClientContactModel.bulkCreate(props);
    return clientContact;
  }

  async updateBulkClientContact(props: UpdateClientContactProps) {
    // Props
    const { client, contacts, company } = props;
    // Delete all the existing attachments for the given relation
    await this.deleteBulkClientContact({ client, company });

    // Then assign the new attachments to the given relation
    const updatedClientContact = await this.createBulkClientContact(contacts);
    return updatedClientContact;
  }

  async deleteBulkClientContact(props: DeleteClientContactProps) {
    // Props
    const { client, company } = props;

    // Find and delete the clientContact by id and company
    const clientContact = await ClientContactModel.destroy({
      where: { client, company },
    });

    return clientContact;
  }
}

export default new ClientContactService();
