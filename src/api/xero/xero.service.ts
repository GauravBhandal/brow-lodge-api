import { omit as _omit } from "lodash";

import xero from "../../components/xero";
import { integrationService } from "../integration";
import {
  RefreshXeroInstanceProps,
  XeroCallbackProps,
  IsConnectedToXeroProps,
  DisconnectXeroProps,
  GetXeroCustomersProp,
  GetXeroEmployeesProp,
} from "./xero.types";
import config from "../../config/environment";

const XERO_INTEGRATION_KEY = "xero";

class XeroService {
  async refreshXeroInstance(props: RefreshXeroInstanceProps) {
    // Props
    const { company } = props;

    // Get the tokenSet for Xero integration from the integrations table
    const xeroTokenSet = await integrationService.getIntegrationByKey({
      company,
      key: XERO_INTEGRATION_KEY,
    });

    // Set the token on xero instance
    await xero.setTokenSet(xeroTokenSet);

    // Refresh token set
    const newXeroTokenSet = await xero.refreshWithRefreshToken(
      config.XERO_CLIENT_ID,
      config.XERO_CLIENT_SECRET,
      xeroTokenSet.refresh_token
    );

    // Save the new tokenset
    await integrationService.updateIntegration({
      key: XERO_INTEGRATION_KEY,
      company,
      meta: newXeroTokenSet,
    });

    await xero.updateTenants();
  }

  async connectXero() {
    const consentUrl = await xero.buildConsentUrl();
    return consentUrl;
  }

  async isConnectedToXero(props: IsConnectedToXeroProps) {
    // Props
    const { company } = props;

    const response = await integrationService.getIntegrationStatusByKey({
      company,
      key: XERO_INTEGRATION_KEY,
    });

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

    const payload = {
      name: "Xero",
      key: "xero",
      meta: tokenSet,
      company,
    };

    // Store xero integration info in DB
    await integrationService.createIntegration(payload);

    return {};
  }

  async getXeroCustomers(props: GetXeroCustomersProp) {
    await this.refreshXeroInstance(props);
    const xeroTenantId = xero.tenants[0].tenantId;

    try {
      const response = await xero.accountingApi.getContacts(xeroTenantId);
      return response.body;
    } catch (err: any) {
      const error = JSON.stringify(err.response?.body, null, 2);
      console.log(`Status Code: ${err.response?.statusCode} => ${error}`);
      return {};
    }
  }

  async getXeroEmployees(props: GetXeroEmployeesProp) {
    await this.refreshXeroInstance(props);
    const xeroTenantId = xero.tenants[1].tenantId;

    try {
      const response = await xero.accountingApi.getEmployees(xeroTenantId);
      return response.body;
    } catch (err: any) {
      const error = JSON.stringify(err.response?.body, null, 2);
      console.log(`Status Code: ${err.response?.statusCode} => ${error}`);
      return {};
    }
  }
}

export default new XeroService();
