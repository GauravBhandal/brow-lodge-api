import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import invoiceService from "./invoice.service";

class InvoiceController {
  async updateInvoice(req: Request, res: Response) {
    const { invoiceId } = req.params;
    const props = {
      id: invoiceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const invoice = await invoiceService.updateInvoice(props);

    res.status(200).json(invoice);
  }

  async updateInvoiceStatus(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const invoice = await invoiceService.updateInvoiceStatus(props);

    res.status(200).json(invoice);
  }

  async generateInvoices(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const invoice = await invoiceService.generateInvoices(props);

    res.status(200).json(invoice);
  }

  async getInvoiceById(req: Request, res: Response) {
    const { invoiceId } = req.params;
    const props = {
      id: invoiceId,
      company: req.auth.companyId,
    };

    const invoice = await invoiceService.getInvoiceById(props);

    res.status(200).json(invoice);
  }

  async getInvoices(req: Request, res: Response) {
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

    const invoices = await invoiceService.getInvoices(props, req.auth.userId);

    res.status(200).json(invoices);
  }
}

export default new InvoiceController();
