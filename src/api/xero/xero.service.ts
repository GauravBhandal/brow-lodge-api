import { omit as _omit } from "lodash";

import xero from "../../components/xero";
import { integrationService } from "../integration";
import {
  RefreshXeroInstanceProps,
  XeroCallbackProps,
  IsConnectedToXeroProps,
  DisconnectXeroProps,
  GetXeroCustomersProps,
  GetXeroEmployeesProps,
  GetXeroPayItemsProps,
  ExportInvoicesToXeroProps,
  ExportTimesheetsToXeroProps,
  SyncXeroEmployeesProps,
  SyncXeroCustomersProps,
  SyncXeroPayItemsProps,
} from "./xero.types";
import config from "../../config/environment";
import { integrationExternalDataService } from "../integration/integrationExternalData";

const XERO_INTEGRATION_KEY = "xero";
enum XERO_EXTERNAL_DATA_TYPE {
  Employees = "xero-employees",
  Customers = "xero-customers",
  Payitems = "xero-payitems",
}

class XeroService {
  async refreshXeroInstance(props: RefreshXeroInstanceProps) {
    // Props
    const { company } = props;

    // Get the tokenSet for Xero integration from the integrations table
    const { meta: xeroTokenSet } = await integrationService.getIntegrationByKey(
      {
        company,
        key: XERO_INTEGRATION_KEY,
      }
    );

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

  async getXeroEmployees(props: GetXeroEmployeesProps) {
    // We are wrapping these calls to try catch because we want to send empty list in case of INTEGRATION_EXTERNAL_DATA_NOT_FOUND
    try {
      const { company } = props;

      // Get the id for Xero integration from the integrations table
      const { id: integration } = await integrationService.getIntegrationByKey({
        company,
        key: XERO_INTEGRATION_KEY,
      });

      const response =
        await integrationExternalDataService.getIntegrationExternalData({
          type: XERO_EXTERNAL_DATA_TYPE.Employees,
          company,
          integration,
        });
      return response?.data;
    } catch (err: any) {
      return [];
    }
  }

  async getXeroCustomers(props: GetXeroCustomersProps) {
    // We are wrapping these calls to try catch because we want to send empty list in case of INTEGRATION_EXTERNAL_DATA_NOT_FOUND
    try {
      const { company } = props;

      // Get the id for Xero integration from the integrations table
      const { id: integration } = await integrationService.getIntegrationByKey({
        company,
        key: XERO_INTEGRATION_KEY,
      });

      const response =
        await integrationExternalDataService.getIntegrationExternalData({
          type: XERO_EXTERNAL_DATA_TYPE.Customers,
          company,
          integration,
        });
      return response?.data;
    } catch (err: any) {
      return [];
    }
  }

  async getPayItems(props: GetXeroPayItemsProps) {
    // We are wrapping these calls to try catch because we want to send empty list in case of INTEGRATION_EXTERNAL_DATA_NOT_FOUND
    try {
      const { company } = props;

      // Get the id for Xero integration from the integrations table
      const { id: integration } = await integrationService.getIntegrationByKey({
        company,
        key: XERO_INTEGRATION_KEY,
      });

      const response =
        await integrationExternalDataService.getIntegrationExternalData({
          type: XERO_EXTERNAL_DATA_TYPE.Payitems,
          company,
          integration,
        });
      return response?.data;
    } catch (err: any) {
      return [];
    }
  }

  async exportInvoicesToXero(props: ExportInvoicesToXeroProps) {
    const { company, invoices } = props;

    await this.refreshXeroInstance({ company });

    // XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0
    const xeroTenantId = xero.tenants[0].tenantId;

    try {
      const response = await xero.accountingApi.updateOrCreateInvoices(
        xeroTenantId,
        invoices
      );
      return response.body;
    } catch (err: any) {
      const error = JSON.stringify(err.response?.body, null, 2);
      console.log(`Status Code: ${err.response?.statusCode} => ${error}`);
      return {};
    }
  }

  async syncXeroEmployees(props: SyncXeroEmployeesProps) {
    const { company } = props;

    await this.refreshXeroInstance(props);
    // XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0

    const xeroTenantId = xero.tenants[0].tenantId;

    try {
      //Get all the employees from xero
      const response = await xero.payrollAUApi.getEmployees(xeroTenantId);

      // Get the id for Xero integration from the integrations table
      const { id: integration } = await integrationService.getIntegrationByKey({
        company,
        key: XERO_INTEGRATION_KEY,
      });

      // Store the new list of employees from Xero in the database
      await integrationExternalDataService.createOrUpdateIntegrationExternalData(
        {
          data: response.body,
          type: XERO_EXTERNAL_DATA_TYPE.Employees,
          company,
          integration,
        }
      );

      return;
    } catch (err: any) {
      const error = JSON.stringify(err.response?.body, null, 2);
      console.log(`Status Code: ${err.response?.statusCode} => ${error}`);
      return;
    }
  }

  async syncXeroCustomers(props: SyncXeroCustomersProps) {
    const { company } = props;

    await this.refreshXeroInstance(props);
    // XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0

    const xeroTenantId = xero.tenants[0].tenantId;

    try {
      // Get all the contacts from xero
      const response = await xero.accountingApi.getContacts(xeroTenantId);

      // Get the id for Xero integration from the integrations table
      const { id: integration } = await integrationService.getIntegrationByKey({
        company,
        key: XERO_INTEGRATION_KEY,
      });

      // Store the new list of contacts from Xero in the database
      await integrationExternalDataService.createOrUpdateIntegrationExternalData(
        {
          data: response.body,
          type: XERO_EXTERNAL_DATA_TYPE.Customers,
          company,
          integration,
        }
      );

      return;
    } catch (err: any) {
      const error = JSON.stringify(err.response?.body, null, 2);
      console.log(`Status Code: ${err.response?.statusCode} => ${error}`);
      return;
    }
  }

  async syncXeroPayItems(props: SyncXeroPayItemsProps) {
    const { company } = props;

    await this.refreshXeroInstance(props);
    // XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0

    const xeroTenantId = xero.tenants[0].tenantId;

    try {
      //Get all the payitems from xero
      const response = await xero.payrollAUApi.getPayItems(xeroTenantId);

      // Get the id for Xero integration from the integrations table
      const { id: integration } = await integrationService.getIntegrationByKey({
        company,
        key: XERO_INTEGRATION_KEY,
      });

      // Store the new list of payitems from Xero in the database
      await integrationExternalDataService.createOrUpdateIntegrationExternalData(
        {
          data: response.body,
          type: XERO_EXTERNAL_DATA_TYPE.Payitems,
          company,
          integration,
        }
      );

      return;
    } catch (err: any) {
      const error = JSON.stringify(err.response?.body, null, 2);
      console.log(`Status Code: ${err.response?.statusCode} => ${error}`);
      return;
    }
  }

  async exportTimesheetToXero(props: ExportTimesheetsToXeroProps) {
    const { company, timesheets } = props;

    await this.refreshXeroInstance({ company });

    // XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0
    const xeroTenantId = xero.tenants[0].tenantId;
    console.log("timesheets", timesheets);
    try {
      const response = await xero.payrollAUApi.createTimesheet(
        xeroTenantId,
        timesheets
      );
      console.log("Response", response.body);
      return response.body;
    } catch (err: any) {
      const error = JSON.stringify(err.response?.body, null, 2);
      console.log(`Status Code: ${err.response?.statusCode} => ${error}`);
      return {};
    }
  }
}

export default new XeroService();
