import { XeroClient } from "xero-node";

const scopes =
  "openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access";

const xero = new XeroClient({
  clientId: "AF4C40B5F2CB4E66929E2ADF6C8A4280",
  clientSecret: "dybnerxaK1pcjTCheC1e4_y9ZrhDzy39elepmTJLJRlc0k6c",
  redirectUris: ["http://localhost:3000/settings/integration"],
  scopes: scopes.split(" "),
});

export default xero;
