import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import templateService from "./template.service";

class TemplateController {
  async createTemplate(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const template = await templateService.createTemplate(props);

    res.status(200).json(template);
  }

  async updateTemplate(req: Request, res: Response) {
    const { templateId } = req.params;
    const props = {
      id: templateId,
      company: req.auth.companyId,
      ...req.body,
    };

    const template = await templateService.updateTemplate(props);

    res.status(200).json(template);
  }

  async deleteTemplate(req: Request, res: Response) {
    const { templateId } = req.params;
    const props = {
      id: templateId,
      company: req.auth.companyId,
    };

    await templateService.deleteTemplate(props);

    res.status(204).json();
  }

  async gettemplateById(req: Request, res: Response) {
    const { templateId } = req.params;
    const props = {
      id: templateId,
      company: req.auth.companyId,
    };

    const template = await templateService.getTemplateById(props);

    res.status(200).json(template);
  }

  async getTemplates(req: Request, res: Response) {
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

    const templates = await templateService.getTemplates(
      props,
      req.auth.userId
    );

    res.status(200).json(templates);
  }
}

export default new TemplateController();
