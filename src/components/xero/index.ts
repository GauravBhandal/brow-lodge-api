import { XeroClient } from "xero-node";
import config from "../../config/environment";

const scopes =
  "openid profile email offline_access accounting.contacts.read payroll.employees.read payroll.settings.read payroll.timesheets";

const xero = new XeroClient({
  clientId: config.XERO_CLIENT_ID,
  clientSecret: config.XERO_CLIENT_SECRET,
  redirectUris: [config.XERO_REDIRECT_URI],
  scopes: scopes.split(" "),
});

export default xero;
