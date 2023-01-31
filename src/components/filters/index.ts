import { Op } from "sequelize";
import { uniq as _uniq } from "lodash";

import { UserErrorCode, userService } from "../../api/user";
import { teamService } from "../../api/team";
import { CustomError } from "../errors";

// Helper function to get sequelize OP operation based on provided props
const getFilterOperations = (op: string, value: string) => {
  switch (op) {
    case "eq":
      return { [Op.eq]: value };
    case "ne":
      return { [Op.ne]: value };
    case "lt":
      return { [Op.lt]: value };
    case "lte":
      return { [Op.lte]: value };
    case "gt":
      return { [Op.gt]: value };
    case "gte":
      return { [Op.gte]: value };
    case "contains":
      return { [Op.iRegexp]: value };
    default:
      break;
  }
};
//TODO error handling

export const getFilters = (whereProps: any = {}) => {
  let filters: Record<string, any> = {}; //Var to store final filters
  let orFilterForSameKey: Array<any> = []; //Var to store filter operations for same key

  Object.keys(whereProps).forEach((prop) => {
    //Loop through every where prop
    const subStrings = prop.split("_"); //split the where prop in substring by key and operation
    const nestedModal = subStrings[0] && subStrings[0].split(".");
    let outerFilterKey = "primaryFilters"; //For nested filter give normal filter in data key and other in that specific key
    let innerFilterKey = subStrings[0];

    const applyOr = Array.isArray(whereProps[prop]); //Check if same key is used for multiple where props
    let filterOperations;
    if (nestedModal.length && nestedModal.length > 1) {
      outerFilterKey = nestedModal[0];
      innerFilterKey = nestedModal[1];
    }
    filters[outerFilterKey] = { ...filters[outerFilterKey] };
    if (applyOr) {
      //Apply or operation if same key is used for multiple where props
      whereProps[prop].forEach((item: any) => {
        filterOperations = getFilterOperations(subStrings[1], item);
        orFilterForSameKey = [...orFilterForSameKey, filterOperations];
      });
      filters[outerFilterKey][innerFilterKey] = {
        ...filters[outerFilterKey][innerFilterKey],
        [Op.or]: orFilterForSameKey,
      };
    } else {
      //Other wise just apply the operations applied to where prop
      filterOperations = getFilterOperations(subStrings[1], whereProps[prop]);
      filters[outerFilterKey][innerFilterKey] = {
        ...filters[outerFilterKey][innerFilterKey],
        ...filterOperations,
      };
    }
  });
  return filters;
};

export const addCientFiltersByTeams = async (
  userId: string,
  companyId: string
) => {
  // Get user by id
  const user = await userService.getUserById({
    id: userId,
    company: companyId,
  });

  // Throw an error if user don't exists
  if (!user) {
    throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
  }

  // Check if the user is mapped to a staff, if not just return all the results as it is
  if (!user.Staff) {
    return {};
  }

  // Find all the teams this staff belongs to and check if permissions if enabled for teams
  const teams = await teamService.getTeams({
    company: companyId,
    page: 1,
    pageSize: 500,
    sort: "updated:DESC",
    where: { "Staff.id_eq": user.Staff.id, permissions_eq: "true", archived_eq: 'false' },
  });
  const clients: any = [];
  teams.data.forEach((team: any) => {
    if (team.Client && team.Client.length) {
      team.Client.forEach((client: any) => {
        clients.push(client.id);
      });
    }
  });
  const uniqueClients = _uniq(clients);
  if (uniqueClients.length === 0) {
    return {};
  }
  const clientFilters = {
    id: {
      [Op.or]: uniqueClients,
    },
  };
  return clientFilters;
};
