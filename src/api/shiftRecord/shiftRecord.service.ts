import { omit as _omit } from "lodash";

import ShiftRecordModel from "./shiftRecord.model";
import {
  CreateShiftRecordProps,
  UpdateShiftRecordProps,
  DeleteShiftRecordProps,
  GetShiftRecordByIdProps,
  GetShiftRecordsProps,
  ShiftRecord,
} from "./shiftRecord.types";
import { CustomError } from "../../components/errors";
import ShiftRecordErrorCode from "./shiftRecord.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import {
  StaffProfile,
  StaffProfileModel,
  staffProfileService,
} from "../staffProfile";
import { Site, SiteModel, siteService } from "../site";
class ShiftRecordService {
  async createShiftRecordInBulk(props: CreateShiftRecordProps[]) {
    const shiftRecords = await ShiftRecordModel.bulkCreate(props);
    return shiftRecords;
  }

  async createShiftRecord(props: CreateShiftRecordProps) {
    const { date, staff, company } = props;

    // Check if type with same name already exists
    const existingType = await ShiftRecordModel.findOne({
      where: {
        company,
        date,
        staff,
      },
    });
    // If exists, then throw an error
    if (existingType) {
      throw new CustomError(
        409,
        ShiftRecordErrorCode.SHIFT_RECORD_ALREADY_EXISTS
      );
    }

    const shiftRecord = await ShiftRecordModel.create(props);
    return shiftRecord;
  }

  async createShuffledShiftRecords(props: CreateShiftRecordProps) {
    const { company } = props;
    const shiftRecordsList: ShiftRecord[] = [];
    const alreadyAssignedSiteIds: Site["id"][] = [];
    let siteMap: any = {};

    const deleteAllShiftRecords = await ShiftRecordModel.destroy({
      where: {
        company,
        date: new Date(),
      },
    });

    const getAllStaffList = await staffProfileService.getAllStaffProfiles({
      company,
    });
    for (const staff of getAllStaffList) {
      await siteService
        .getSitesWithoutIds({
          company,
          staff: staff.id,
          alreadyAssignedSiteIds,
        })
        .then(async (getAllSites) => {
          const sitesLength = getAllSites.length;
          let selectedSite = null;
          if (sitesLength > 0) {
            const randomIndex = Math.floor(Math.random() * sitesLength);
            const selectedSite = getAllSites[randomIndex];
            const createShift = await this.createShiftRecord({
              company,
              staff: staff.id,
              date: new Date(),
              site: selectedSite.id,
            });
            shiftRecordsList.push(createShift);
            if (!siteMap[selectedSite.id]) {
              siteMap[selectedSite.id] = 0;
            }
            siteMap = {
              ...siteMap,
              [selectedSite.id]: siteMap[selectedSite.id] + 1,
            };
            if (siteMap[selectedSite.id] == selectedSite.numberOfEmployee) {
              alreadyAssignedSiteIds.push(selectedSite.id);
            }
          } else {
            const createShift = await this.createShiftRecord({
              company,
              staff: staff.id,
              date: new Date(),
            });
            shiftRecordsList.push(createShift);
          }
        });
    }
    return shiftRecordsList;
  }

  async updateShiftRecord(props: UpdateShiftRecordProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find shiftRecord by id and company
    const shiftRecord = await ShiftRecordModel.findOne({
      where: { id, company },
    });

    // if shiftRecord not found, throw an error
    if (!shiftRecord) {
      throw new CustomError(404, ShiftRecordErrorCode.SHIFT_RECORD_NOT_FOUND);
    }

    // Finally, update the shiftRecord
    const [, [updatedShiftRecord]] = await ShiftRecordModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedShiftRecord;
  }

  async deleteShiftRecord(props: DeleteShiftRecordProps) {
    // Props
    const { id, company } = props;

    // Find and delete the shiftRecord by id and company
    const shiftRecord = await ShiftRecordModel.destroy({
      where: { id, company },
    });

    // if shiftRecord has been deleted, throw an error
    if (!shiftRecord) {
      throw new CustomError(404, ShiftRecordErrorCode.SHIFT_RECORD_NOT_FOUND);
    }

    return shiftRecord;
  }

  async getShiftRecordById(props: GetShiftRecordByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the shiftRecord by id and company
    const shiftRecord = await ShiftRecordModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
        {
          model: SiteModel,
          as: "Site",
          required: false,
        },
      ],
    });

    // If no shiftRecord has been found, then throw an error
    if (!shiftRecord) {
      throw new CustomError(404, ShiftRecordErrorCode.SHIFT_RECORD_NOT_FOUND);
    }

    return shiftRecord;
  }

  async getShiftRecords(props: GetShiftRecordsProps) {
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
        as: "Staff",
      },
      {
        model: SiteModel,
        as: "Site",
        required: false,
      },
    ];

    // Count total shiftRecords in the given company
    const count = await ShiftRecordModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all shiftRecords for matching props and company
    const data = await ShiftRecordModel.findAll({
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
}

export default new ShiftRecordService();
