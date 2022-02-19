import { omit as _omit } from "lodash";

import IncidentTypeModel from "./incidentType.model";
import { GetIncidentTypesProps } from "./incidentType.types";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { getFilters } from "../../components/filters";

class IncidentTypeService {
  async getIncidentTypes(props: GetIncidentTypesProps) {
    // Props
    const { page, pageSize, sort, where } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total incidentTypes in the given company
    const count = await IncidentTypeModel.count({
      where: {
        ...filters["primaryFilters"],
      },
      distinct: true,
    });

    // Find all incidentTypes for matching props and company
    const data = await IncidentTypeModel.findAll({
      offset,
      limit,
      order,
      where: {
        ...filters["primaryFilters"],
      },
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new IncidentTypeService();
