import ServicePayLevelModel from "./servicePayLevel.model";
import {
  ServicePayLevel,
  UpdateBulkServicePayLevelProps,
  DeleteBulkServicePayLevelProps,
  GetServicePayLevelProps,
} from "./servicePayLevel.types";

class ServicePayLevelService {
  async updateBulkServicePayLevel(
    props: UpdateBulkServicePayLevelProps[],
    company: ServicePayLevel["company"]
  ) {
    // Delete all the existing entries for the given company
    await this.deleteBulkServicePayLevel({ company });

    const servicePayLevel = await ServicePayLevelModel.bulkCreate(props);

    return servicePayLevel;
  }

  async deleteBulkServicePayLevel(props: DeleteBulkServicePayLevelProps) {
    const { company } = props;
    await ServicePayLevelModel.destroy({
      where: {
        company,
      },
    });
  }

  async getServicePayLevel(props: GetServicePayLevelProps) {
    const { company } = props;
    const payItems = await ServicePayLevelModel.findAll({
      where: {
        company,
      },
    });

    return payItems;
  }
}

export default new ServicePayLevelService();
