import { XeroClient } from "xero-node";
import config from "../../config/environment";

const scopes =
  " openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.attachments accounting.transactions offline_access accounting.contacts.read payroll.employees.read payroll.settings payroll.timesheets";

const xero = new XeroClient({
  clientId: config.XERO_CLIENT_ID,
  clientSecret: config.XERO_CLIENT_SECRET,
  redirectUris: ["http://localhost:3000/settings/integration"],
  scopes: scopes.split(" "),
});

export default xero;
