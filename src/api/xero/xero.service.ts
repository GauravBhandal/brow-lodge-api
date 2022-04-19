import { omit as _omit } from "lodash";
import xero from "../../components/xero";
import { companyService } from "../company";
import { GetCustomersProp, XeroCallbackProps } from "./xero.types";

class XeroService {
  async connectXero() {
    const consentUrl = await xero.buildConsentUrl();
    return consentUrl;
  }

  async callbackXero(props: XeroCallbackProps) {
    // Props
    const { company, url } = props;

    const tokenSet = await xero.apiCallback(url);
    const updateTokenProps = { xeroTokenSet: tokenSet, company };

    const updatedCompany = await companyService.updateCompanyXeroTokenSet(
      updateTokenProps
    );

    return updatedCompany;
  }
  async getCustomers(props: GetCustomersProp) {
    // Props
    const { company } = props;

    const companyData = await companyService.getCompanyById({ company });

    await xero.setTokenSet(companyData.xeroTokenSet);
    const validTokenSet = await xero.refreshWithRefreshToken(
      "AF4C40B5F2CB4E66929E2ADF6C8A4280",
      "dybnerxaK1pcjTCheC1e4_y9ZrhDzy39elepmTJLJRlc0k6c",
      companyData.xeroTokenSet.refresh_token
    ); // save the new tokenset
    await xero.updateTenants();
    const xeroTenantId = xero.tenants[0].tenantId;
    try {
      const response = await xero.accountingApi.getContacts(xeroTenantId);
      console.log(response.body || response.response.statusCode);
      return response.body;
    } catch (err: any) {
      const error = JSON.stringify(err.response.body, null, 2);
      console.log(`Status Code: ${err.response.statusCode} => ${error}`);
    }

    return {};
  }
  async getEmployees(props: GetCustomersProp) {
    // Props
    const { company } = props;

    const companyData = await companyService.getCompanyById({ company });

    await xero.setTokenSet(companyData.xeroTokenSet);
    const validTokenSet = await xero.refreshWithRefreshToken(
      "AF4C40B5F2CB4E66929E2ADF6C8A4280",
      "dybnerxaK1pcjTCheC1e4_y9ZrhDzy39elepmTJLJRlc0k6c",
      companyData.xeroTokenSet.refresh_token
    ); // save the new tokenset
    await xero.updateTenants();
    const xeroTenantId = xero.tenants[0].tenantId;
    try {
      const response = await xero.accountingApi.getEmployees(xeroTenantId);
      console.log(response.body || response.response.statusCode);
      return response.body;
    } catch (err: any) {
      const error = JSON.stringify(err.response.body, null, 2);
      console.log(`Status Code: ${err.response.statusCode} => ${error}`);
    }

    return {};
  }
}

export default new XeroService();
