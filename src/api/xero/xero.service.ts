import { omit as _omit } from "lodash";
import xero from "../../components/xero";
import { companyService } from "../company";
import { XeroCallbackProps } from "./xero.types";

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
}

export default new XeroService();
