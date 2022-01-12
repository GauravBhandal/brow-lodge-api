import CompanyModel from "./company.model";
import {
  Company,
  CreateCompanyProps,
  UpdateCompanyProps,
} from "./company.types";
import { CustomError } from "../../components/errors";
import CompanyErrorCode from "./company.error";

class CompanyService {
  async createCompany(props: CreateCompanyProps) {
    const company = await CompanyModel.create(props);
    return company;
  }

  async updateCompany(companyId: Company["id"], props: UpdateCompanyProps) {
    const company = await CompanyModel.findOne({ where: { id: companyId } });
    if (!company) {
      throw new CustomError(404, CompanyErrorCode.COMPANY_NOT_FOUND);
    }
    const [, [updatedCompany]] = await CompanyModel.update(props, {
      where: { id: companyId },
      returning: true,
    });
    return updatedCompany;
  }

  async getCompanyById(companyId: Company["id"]) {
    const company = await CompanyModel.findOne({
      where: { id: companyId },
    });
    return company;
  }
}

export default new CompanyService();
