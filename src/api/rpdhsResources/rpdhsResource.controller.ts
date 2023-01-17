import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
import { alertConfigurationService } from "../alertConfiguration";

import rpdhsResourceService from "./rpdhsResource.service";

class RpdhsResourceController {
  async createRpdhsResource(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const rpdhsResource = await rpdhsResourceService.createRpdhsResource(props);

    // Send Email after creating the entry if alerts are set and emails are present
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'RPDHSResource' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const contentArray: { label: string, value: string }[] = [
          { label: 'Name', value: rpdhsResource.name },
          { label: 'Version', value: rpdhsResource.version },
        ]
        const url = `/company/rpdhs-resource/${rpdhsResource.id}`
        const emailBody = getTemplateContent('RP DHS Resource Added', 'A RP DHS resource added with following details!', contentArray, url, 'RP DHS Resource')
        sendEmail(alertNotificationEmails, emailBody, "New RP DHS Resource added successfully!")
      }
    });

    res.status(200).json(rpdhsResource);
  }

  async updateRpdhsResource(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const rpdhsResource = await rpdhsResourceService.updateRpdhsResource(props);

    res.status(200).json(rpdhsResource);
  }

  async deleteRpdhsResource(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
    };

    await rpdhsResourceService.deleteRpdhsResource(props);

    res.status(204).json();
  }

  async deleteArchiveRpdhsResource(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
    };

    await rpdhsResourceService.deleteArchiveRpdhsResource(props);

    res.status(204).json();
  }

  async getrpdhsResourceById(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
    };

    const rpdhsResource = await rpdhsResourceService.getRpdhsResourceById(
      props
    );

    res.status(200).json(rpdhsResource);
  }

  async getRpdhsResources(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;
    const props = {
      company: req.auth.companyId,
      ...queryParams,
    };

    const rpdhsResources = await rpdhsResourceService.getRpdhsResources(
      props,
      req.auth.userId
    );

    res.status(200).json(rpdhsResources);
  }
}

export default new RpdhsResourceController();
