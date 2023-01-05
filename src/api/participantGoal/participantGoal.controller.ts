import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import participantGoalService from "./participantGoal.service";

class ParticipantGoalController {
  async createParticipantGoal(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const participantGoal = await participantGoalService.createParticipantGoal(
      props
    );

    res.status(200).json(participantGoal);
  }

  async updateParticipantGoal(req: Request, res: Response) {
    const { participantGoalId } = req.params;
    const props = {
      id: participantGoalId,
      company: req.auth.companyId,
      ...req.body,
    };

    const participantGoal = await participantGoalService.updateParticipantGoal(
      props
    );

    res.status(200).json(participantGoal);
  }

  async deleteParticipantGoal(req: Request, res: Response) {
    const { participantGoalId } = req.params;
    const props = {
      id: participantGoalId,
      company: req.auth.companyId,
    };

    await participantGoalService.deleteParticipantGoal(props);

    res.status(204).json();
  }

  async deleteArchiveParticipantGoal(req: Request, res: Response) {
    const { participantGoalId } = req.params;
    const props = {
      id: participantGoalId,
      company: req.auth.companyId,
    };

    await participantGoalService.deleteArchiveParticipantGoal(props);

    res.status(204).json();
  }

  async getparticipantGoalById(req: Request, res: Response) {
    const { participantGoalId } = req.params;
    const props = {
      id: participantGoalId,
      company: req.auth.companyId,
    };

    const participantGoal = await participantGoalService.getParticipantGoalById(
      props
    );

    res.status(200).json(participantGoal);
  }

  async getParticipantGoals(req: Request, res: Response) {
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

    const participantGoals = await participantGoalService.getParticipantGoals(
      props,
      req.auth.userId
    );

    res.status(200).json(participantGoals);
  }
}

export default new ParticipantGoalController();
