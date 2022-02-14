import { omit as _omit } from "lodash";

import TeamModel from "./team.model";
import {
  CreateTeamProps,
  UpdateTeamProps,
  DeleteTeamProps,
  GetTeamByIdProps,
  GetTeamsProps,
} from "./team.types";
import { CustomError } from "../../components/errors";
import TeamErrorCode from "./team.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { getFilters } from "../../components/filters";
import { teamClientProfileService } from "./teamClientProfile";
import { teamStaffProfileService } from "./teamStaffProfile";

class TeamService {
  async createTeam(props: CreateTeamProps) {
    const team = await TeamModel.create(props);

    // Add StaffProfiles
    if (props.staff && props.staff.length) {
      await teamStaffProfileService.createBulkTeamStaffProfile({
        team: team.id,
        staff: props.staff,
      });
    }

    // Add ClientProfiles
    if (props.client && props.client.length) {
      await teamClientProfileService.createBulkTeamClientProfile({
        team: team.id,
        client: props.client,
      });
    }
    return team;
  }

  async updateTeam(props: UpdateTeamProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find team by id and company
    const team = await TeamModel.findOne({
      where: { id, company },
    });

    // if team not found, throw an error
    if (!team) {
      throw new CustomError(404, TeamErrorCode.TEAM_NOT_FOUND);
    }

    // Finally, update the team
    const [, [updatedTeam]] = await TeamModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update staffProfiles
    if (props.staff) {
      await teamStaffProfileService.updateBulkTeamStaffProfile({
        team: team.id,
        staff: props.staff,
      });
    }

    // Update clientProfiles
    if (props.client) {
      await teamClientProfileService.updateBulkTeamClientProfile({
        team: team.id,
        client: props.client,
      });
    }

    return updatedTeam;
  }

  async deleteTeam(props: DeleteTeamProps) {
    // Props
    const { id, company } = props;

    // Find and delete the team by id and company
    const team = await TeamModel.destroy({
      where: { id, company },
    });

    // if team has been deleted, throw an error
    if (!team) {
      throw new CustomError(404, TeamErrorCode.TEAM_NOT_FOUND);
    }

    return team;
  }

  async getTeamById(props: GetTeamByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the team by id and company
    const team = await TeamModel.findOne({
      where: { id, company },
      include: [
        {
          model: StaffProfileModel,
          through: {
            attributes: [],
          },
          as: "Staff",
        },
        {
          model: ClientProfileModel,
          through: {
            attributes: [],
          },
          as: "Client",
        },
        {
          model: CompanyModel,
        },
      ],
    });

    // If no team has been found, then throw an error
    if (!team) {
      throw new CustomError(404, TeamErrorCode.TEAM_NOT_FOUND);
    }

    return team;
  }

  async getTeams(props: GetTeamsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: StaffProfileModel,
        through: {
          attributes: [],
        },
        as: "Staff",
      },
      {
        model: ClientProfileModel,
        through: {
          attributes: [],
        },
        as: "Client",
      },
    ];

    // Count total teams in the given company
    const count = await TeamModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all teams for matching props and company
    const data = await TeamModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new TeamService();
