import { CustomError } from "../errors";
import { Order } from "sequelize";

export const getSortingParams = (sort: string) => {
  const allowedSortOrder = ["DESC", "ASC"];
  const subStrings = sort.split(":");

  if (subStrings.length === 2 && allowedSortOrder.includes(subStrings[1])) {
    return [subStrings] as Order;
  }

  throw new CustomError(400, "INVALID_SORT_PARAM");
};
