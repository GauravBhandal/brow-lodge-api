import crypto from "crypto-js";
import { omit as _omit } from "lodash";

import xero from "../../components/xero";
import { companyService } from "../company";
import { integrationService } from "../integration";
import {
  GetCustomersProp,
  XeroCallbackProps,
  IsConnectedToXeroProps,
  DisconnectXeroProps,
} from "./xero.types";
import config from "../../config/environment";

const XERO_INTEGRATION_KEY = "xero";

class XeroService {
  async connectXero() {
    const consentUrl = await xero.buildConsentUrl();
    return consentUrl;
  }

  async isConnectedToXero(props: IsConnectedToXeroProps) {
    // Props
    const { company } = props;

    let response = {};
    try {
      await integrationService.getIntegrationByKey({
        company,
        key: XERO_INTEGRATION_KEY,
      });
      response = {
        isConnected: true,
      };
    } catch (error) {
      response = {
        isConnected: false,
      };
    }

    return response;
  }

  async disconnectXero(props: DisconnectXeroProps) {
    // Props
    const { company } = props;

    const response = await integrationService.deleteIntegrationByKey({
      company,
      key: XERO_INTEGRATION_KEY,
    });

    return response;
  }

  async callbackXero(props: XeroCallbackProps) {
    // Props
    const { company, url } = props;

    // Generate xero token
    const tokenSet = await xero.apiCallback(url);

    // Encrypt the tokenSet
    const encryptedTokenSet = crypto.AES.encrypt(
      JSON.stringify(tokenSet),
      config.TOKEN_KEY
    ).toString();

    const payload = {
      name: "Xero",
      key: "xero",
      meta: encryptedTokenSet,
      company,
    };

    // Store xero integration info in DB
    await integrationService.createIntegration(payload);

    return {};
  }

  async getCustomers(props: GetCustomersProp) {
    // Props
    const { company } = props;

    const companyData = await companyService.getCompanyById({ company });

    await xero.setTokenSet(companyData.xeroTokenSet);
    const validTokenSet = await xero.refreshWithRefreshToken(
      config.XERO_CLIENT_ID,
      config.XERO_CLIENT_SECRET,
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
      config.XERO_CLIENT_ID,
      config.XERO_CLIENT_SECRET,
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
