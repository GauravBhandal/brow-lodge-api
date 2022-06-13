import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import participantMedicationChartService from "./participantMedicationChart.service";

class ParticipantMedicationChartController {
  async createParticipantMedicationChart(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const participantMedicationChart =
      await participantMedicationChartService.createParticipantMedicationChart(
        props
      );

    res.status(200).json(participantMedicationChart);
  }

  async updateParticipantMedicationChart(req: Request, res: Response) {
    const { participantMedicationChartId } = req.params;
    const props = {
      id: participantMedicationChartId,
      company: req.auth.companyId,
      ...req.body,
    };

    const participantMedicationChart =
      await participantMedicationChartService.updateParticipantMedicationChart(
        props
      );

    res.status(200).json(participantMedicationChart);
  }

  async deleteParticipantMedicationChart(req: Request, res: Response) {
    const { participantMedicationChartId } = req.params;
    const props = {
      id: participantMedicationChartId,
      company: req.auth.companyId,
    };

    await participantMedicationChartService.deleteParticipantMedicationChart(
      props
    );

    res.status(204).json();
  }

  async getparticipantMedicationChartById(req: Request, res: Response) {
    const { participantMedicationChartId } = req.params;
    const props = {
      id: participantMedicationChartId,
      company: req.auth.companyId,
    };

    const participantMedicationChart =
      await participantMedicationChartService.getParticipantMedicationChartById(
        props
      );

    res.status(200).json(participantMedicationChart);
  }

  async getParticipantMedicationCharts(req: Request, res: Response) {
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

    const participantMedicationCharts =
      await participantMedicationChartService.getParticipantMedicationCharts(
        props,
        req.auth.userId
      );

    res.status(200).json(participantMedicationCharts);
  }
}

export default new ParticipantMedicationChartController();
