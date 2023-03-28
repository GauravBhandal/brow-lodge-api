import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import TeamModel from "./team.model";
import {
  CreateTeamProps,
  UpdateTeamProps,
  DeleteTeamProps,
  GetTeamByIdProps,
  GetTeamsProps,
  UpdateTeamPermissionsProps,
  GetTeamByIds,
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
    // Props
    const { company, name } = props;

    // Check if team with same name already exists
    const existingTeam = await TeamModel.findOne({
      where: {
        company,
        name: {
          [Op.iLike]: `${name}`,
        },
      },
    });

    // If exists, then throw an error
    if (existingTeam) {
      throw new CustomError(409, TeamErrorCode.TEAM_ALREADY_EXISTS);
    }

    // Otherwise, create a new team
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

    if (team.name.toLowerCase() !== props.name.toLowerCase()) {
      // Check if team with same name already exists
      const existingTeam = await TeamModel.findOne({
        where: {
          name: {
            [Op.iLike]: `${props.name}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingTeam) {
        throw new CustomError(409, TeamErrorCode.TEAM_ALREADY_EXISTS);
      }
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

  async deleteArchiveTeam(props: DeleteTeamProps) {
    // Props
    const { id, company } = props;

    // Find and delete the team by id and company
    const team = await TeamModel.findOne({
      where: { id, company },
    });

    // if team has been deleted, throw an error
    if (!team) {
      throw new CustomError(404, TeamErrorCode.TEAM_NOT_FOUND);
    }

    if (team.archived) {
      // Check if team already exists
      const existingTeam = await TeamModel.findAll({
        where: {
          name: team.name,
          company: team.company,
          archived: false,
        },
      });

      if (existingTeam.length > 0) {
        throw new CustomError(409, TeamErrorCode.TEAM_ALREADY_EXISTS);
      }
    }

    // Finally, update the team update the Archive state
    const [, [updatedTeam]] = await TeamModel.update(
      { archived: !team.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

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
        ...(filters["Staff"] && {
          where: {
            ...filters["Staff"],
          },
        }),
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

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
  async getTeamsByIds(props: GetTeamByIds) {
    // Props
    const { page, pageSize, sort, where, company, ids } = props;

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
        id:ids,
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
        id:ids,
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }

  async updateTeamPermissions(props: UpdateTeamPermissionsProps) {
    const { permissions, company } = props;

    // Finally, update the team
    const [, [updatedTeams]] = await TeamModel.update(
      { permissions },
      {
        where: { company },
        returning: true,
      }
    );
    return updatedTeams;
  }
}

export default new TeamService();
