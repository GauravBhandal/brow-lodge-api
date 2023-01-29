import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
import { formatDateToString, getFormattedTime } from "../../utils/shiftGenerator";
import { alertConfigurationService } from "../alertConfiguration";

import staffSleepDisturbanceService from "./staffSleepDisturbance.service";

class StaffSleepDisturbanceController {
  async createStaffSleepDisturbance(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const staffSleepDisturbance =
      await staffSleepDisturbanceService.createStaffSleepDisturbance(props);

    // Send Email after creating the entry if alerts are set and emails are present 
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'sleepDisturbance' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const contentArray: { label: string, value: string }[] = [
          { label: 'Date', value: formatDateToString(staffSleepDisturbance.date, '', 'DD-MMM-YYYY') },
          { label: 'Start Time', value: `${getFormattedTime(staffSleepDisturbance.startTime)}` },
          { label: 'End Time', value: `${getFormattedTime(staffSleepDisturbance.endTime)}` },
          { label: 'Total Hours', value: `${staffSleepDisturbance.totalHours}` },
        ]
        const url = `/reporting/sleep-disturbances/${staffSleepDisturbance.id}`
        const emailBody = getTemplateContent('Sleep Disturbance Added', 'A sleep disturbance added with following details!', contentArray, url, 'Sleep Disturbance')
        sendEmail(alertNotificationEmails, emailBody, "New sleep disturbance added successfully!")
      }
    });

    res.status(200).json(staffSleepDisturbance);
  }

  async updateStaffSleepDisturbance(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const staffSleepDisturbance =
      await staffSleepDisturbanceService.updateStaffSleepDisturbance(props);

    res.status(200).json(staffSleepDisturbance);
  }

  async deleteStaffSleepDisturbance(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
    };

    await staffSleepDisturbanceService.deleteStaffSleepDisturbance(props);

    res.status(204).json();
  }

  async deleteArchiveStaffSleepDisturbance(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
    };

    await staffSleepDisturbanceService.deleteArchiveStaffSleepDisturbance(
      props
    );

    res.status(204).json();
  }

  async getstaffSleepDisturbanceById(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
    };

    const staffSleepDisturbance =
      await staffSleepDisturbanceService.getStaffSleepDisturbanceById(props);

    res.status(200).json(staffSleepDisturbance);
  }

  async getStaffSleepDisturbances(req: Request, res: Response) {
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

    const staffSleepDisturbances =
      await staffSleepDisturbanceService.getStaffSleepDisturbances(
        props,
        req.auth.userId
      );

    res.status(200).json(staffSleepDisturbances);
  }
}

export default new StaffSleepDisturbanceController();
