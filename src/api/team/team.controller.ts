import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import teamService from "./team.service";

class TeamController {
  async createTeam(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const team = await teamService.createTeam(props);

    res.status(200).json(team);
  }

  async updateTeam(req: Request, res: Response) {
    const { teamId } = req.params;
    const props = {
      id: teamId,
      company: req.auth.companyId,
      ...req.body,
    };

    const team = await teamService.updateTeam(props);

    res.status(200).json(team);
  }

  async updateTeamPermissions(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const team = await teamService.updateTeamPermissions(props);

    res.status(200).json(team);
  }

  async deleteArchiveTeam(req: Request, res: Response) {
    const { teamId } = req.params;
    const props = {
      id: teamId,
      company: req.auth.companyId,
    };

    await teamService.deleteArchiveTeam(props);

    res.status(204).json();
  }

  async deleteTeam(req: Request, res: Response) {
    const { teamId } = req.params;
    const props = {
      id: teamId,
      company: req.auth.companyId,
    };

    await teamService.deleteTeam(props);

    res.status(204).json();
  }

  async getteamById(req: Request, res: Response) {
    const { teamId } = req.params;
    const props = {
      id: teamId,
      company: req.auth.companyId,
    };

    const team = await teamService.getTeamById(props);

    res.status(200).json(team);
  }

  async getTeams(req: Request, res: Response) {
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

    const teams = await teamService.getTeams(props);

    res.status(200).json(teams);
  }
}

export default new TeamController();
