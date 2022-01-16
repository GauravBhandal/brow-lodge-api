import CompanyModel from "./company.model";
import {
  Company,
  CreateCompanyProps,
  GetCompanyByIdProps,
  UpdateCompanyProps,
} from "./company.types";
import { CustomError } from "../../components/errors";
import CompanyErrorCode from "./company.error";

class CompanyService {
  async createCompany(props: CreateCompanyProps) {
    const company = await CompanyModel.create(props);

    return company;
  }

  async updateCompany(props: UpdateCompanyProps) {
    // Props
    const { company, companyId, name } = props;

    // If the user tries to update someone else's company
    if (company !== companyId) {
      throw new CustomError(404, CompanyErrorCode.COMPANY_NOT_FOUND);
    }

    // Check if company exists
    const exsitingCompany = await CompanyModel.findOne({
      where: { id: companyId },
    });

    // If not, then throw an error
    if (!exsitingCompany) {
      throw new CustomError(404, CompanyErrorCode.COMPANY_NOT_FOUND);
    }

    // Update company by passing given props
    const [, [updatedCompany]] = await CompanyModel.update(
      { name },
      {
        where: { id: companyId },
        returning: true,
      }
    );

    return updatedCompany;
  }

  async getCompanyById(props: GetCompanyByIdProps) {
    // If the user tries to get someone else's comapny
    if (props.company !== props.companyId) {
      throw new CustomError(404, CompanyErrorCode.COMPANY_NOT_FOUND);
    }

    // Find company by id
    const company = await CompanyModel.findOne({
      where: { id: props.companyId },
    });

    return company;
  }
}

export default new CompanyService();
