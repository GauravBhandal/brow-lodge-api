import { Op } from "sequelize";

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

export const getFilters = (whereProps: any) => {
  let filters: Record<string, any> = {}; //Var to store final filters
  let orFilterForSameKey: Array<any> = []; //Var to store filter operations for same key

  Object.keys(whereProps).forEach((prop) => {
    //Loop through every where prop
    const subStrings = prop.split("_"); //split the where prop in substring by key and operation

    const applyOr = Array.isArray(whereProps[prop]); //Check if same key is used for multiple where props
    let filterOperations;
    if (applyOr) {
      //Apply or operation if same key is used for multiple where props
      whereProps[prop].forEach((item: any) => {
        filterOperations = getFilterOperations(subStrings[1], item);
        orFilterForSameKey = [...orFilterForSameKey, filterOperations];
      });
      filters[subStrings[0]] = { [Op.or]: orFilterForSameKey };
    } else {
      //Other wise just apply the operations applied to where prop
      filterOperations = getFilterOperations(subStrings[1], whereProps[prop]);
      filters[subStrings[0]] = {
        ...filters[subStrings[0]],
        ...filterOperations,
      };
    }
  });

  return filters;
};
