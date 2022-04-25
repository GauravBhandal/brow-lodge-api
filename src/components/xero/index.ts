import { XeroClient } from "xero-node";
import config from "../../config/environment";

const scopes = "accounting.contacts.read payroll.employees.read";

const xero = new XeroClient({
  clientId: config.XERO_CLIENT_ID,
  clientSecret: config.XERO_CLIENT_SECRET,
  redirectUris: ["http://localhost:3000/settings/integration"],
  scopes: scopes.split(" "),
});

export default xero;
