import { omit as _omit } from "lodash";

import ServiceDeliveryModel from "./serviceDelivery.model";
import {
  CreateServiceDeliveryProps,
  UpdateServiceDeliveryProps,
  DeleteServiceDeliveryProps,
  GetServiceDeliveryByIdProps,
  GetServiceDeliveriesProps,
} from "./serviceDelivery.types";
import { CustomError } from "../../components/errors";
import ServiceDeliveryErrorCode from "./serviceDelivery.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel, companyService } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { ServiceModel } from "../service";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { ProgressNote, progressNoteService } from "../progressNote";
import {
  ShiftRecord,
  ShiftRecordModel,
  shiftRecordService,
} from "../shiftRecord";
import { ShiftRecordStatus } from "../shiftRecord/shiftRecord.constant";
import makeMoment from "../../components/moment";
import { getEndDate } from "../../utils/shiftGenerator";

class ServiceDeliveryService {
  async createServiceDelivery(props: CreateServiceDeliveryProps) {
    // Create Progress Notes
    const createProgressNoteProp = {
      date: props.date,
      shiftStartTime: props.startTime,
      shiftEndTime: props.endTime,
      staff: [props.staff],
      client: props.client,
      company: props.company,
      notes: props.notes,
    };
    const progressNote = await progressNoteService.createProgressNote(
      createProgressNoteProp
    );

    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    // Create shift
    const startDate = makeMoment(props.date, companyData.timezone).format(
      "YYYY-MM-DD"
    );
    const startTime = props.startTime;
    const tStartDateTime = startDate + " " + startTime;
    const startDateTime = makeMoment(
      tStartDateTime,
      companyData.timezone
    ).toDate();

    const endDate = getEndDate(
      props.startTime,
      props.endTime,
      startDate,
      companyData.timezone
    );

    const endTime = props.endTime;
    const tEndDateTime = endDate + " " + endTime;
    const endDateTime = makeMoment(tEndDateTime, companyData.timezone).toDate();

    const createShiftProp = {
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      break: undefined,
      staff: [props.staff],
      client: [props.client],
      company: props.company,
      services: [
        {
          service: props.service,
          startTime: startDateTime,
        },
      ],
      status: ShiftRecordStatus.PUBLISHED,
      claimType: props.claimType,
    };

    const shiftRecord = await shiftRecordService.createShiftRecord(
      createShiftProp
    );

    // Finally, create service delivery
    const createProps = {
      ...props,
      progressnote: progressNote.id,
      shift: shiftRecord.id,
    };
    const serviceDelivery = await ServiceDeliveryModel.create(createProps);
    return serviceDelivery;
  }

  async _updateProgressNote(
    props: UpdateServiceDeliveryProps,
    progressnote: ProgressNote["id"]
  ) {
    let progressNote;
    const progressNoteProp = {
      date: props.date,
      shiftStartTime: props.startTime,
      shiftEndTime: props.endTime,
      staff: [props.staff],
      client: props.client,
      company: props.company,
      notes: props.notes,
    };
    try {
      // Find progress notes by id
      if (progressnote) {
        const existingProgressNote =
          await progressNoteService.getProgressNoteById({
            id: progressnote,
            company: props.company,
          });

        const updateProgressNoteProp = {
          ...progressNoteProp,
          id: existingProgressNote.id,
        };
        // If found, update it
        progressNote = await progressNoteService.updateProgressNote(
          updateProgressNoteProp
        );
      } else {
        progressNote = await progressNoteService.createProgressNote(
          progressNoteProp
        );
      }
    } catch (error) {
      // Otherwise, create a new one
      progressNote = await progressNoteService.createProgressNote(
        progressNoteProp
      );
    }
    return progressNote;
  }

  async _updateShift(
    props: UpdateServiceDeliveryProps,
    shift: ShiftRecord["id"]
  ) {
    let shiftRecord;

    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    const startDate = makeMoment(props.date, companyData.timezone).format(
      "YYYY-MM-DD"
    );
    const startTime = props.startTime;
    const tStartDateTime = startDate + " " + startTime;
    const startDateTime = makeMoment(
      tStartDateTime,
      companyData.timezone
    ).toDate();

    const endDate = getEndDate(
      props.startTime,
      props.endTime,
      startDate,
      companyData.timezone
    );

    const endTime = props.endTime;
    const tEndDateTime = endDate + " " + endTime;
    const endDateTime = makeMoment(tEndDateTime, companyData.timezone).toDate();

    const updateShiftProp = {
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      break: undefined,
      staff: [props.staff],
      client: [props.client],
      company: props.company,
      updateRecurring: false,
      services: [
        {
          service: props.service,
          startTime: startDateTime,
        },
      ],
      status: ShiftRecordStatus.PUBLISHED,
      claimType: props.claimType,
    };

    // Find shift record by id
    if (shift) {
      let existingShiftRecord;
      try {
        // Find shift by id
        existingShiftRecord = await shiftRecordService.getShiftRecordById({
          id: shift,
          company: props.company,
        });
      } catch (error) {
        // If not found, create a new one
        shiftRecord = await shiftRecordService.createShiftRecord(
          updateShiftProp
        );
      }

      if (existingShiftRecord) {
        const updateShiftRecordProp = {
          ...updateShiftProp,
          id: existingShiftRecord.id,
        };
        // If found, update it
        shiftRecord = await shiftRecordService.updateShiftRecord(
          updateShiftRecordProp
        );
      }
    } else {
      shiftRecord = await shiftRecordService.createShiftRecord(updateShiftProp);
    }
    return shiftRecord as ShiftRecord;
  }

  async updateServiceDelivery(props: UpdateServiceDeliveryProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find serviceDelivery by id and company
    const serviceDelivery = await ServiceDeliveryModel.findOne({
      where: { id, company },
    });

    // if serviceDelivery not found, throw an error
    if (!serviceDelivery) {
      throw new CustomError(
        404,
        ServiceDeliveryErrorCode.SERVICE_DELIVERY_NOT_FOUND
      );
    }

    // Update shift record
    const shiftRecord = await this._updateShift(props, serviceDelivery.shift!);

    // Update progress note
    const progressNote = await this._updateProgressNote(
      props,
      serviceDelivery.progressnote!
    );

    const newUpdateProps = {
      ...updateProps,
      progressnote: progressNote.id,
      shift: shiftRecord.id,
    };

    // Finally, update the serviceDelivery
    const [, [updatedServiceDelivery]] = await ServiceDeliveryModel.update(
      newUpdateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedServiceDelivery;
  }

  async deleteServiceDelivery(props: DeleteServiceDeliveryProps) {
    // Props
    const { id, company } = props;

    // Find serviceDelivery by id and company
    const serviceDelivery = await ServiceDeliveryModel.findOne({
      where: { id, company },
    });

    // if serviceDelivery has been deleted, throw an error
    if (!serviceDelivery) {
      throw new CustomError(
        404,
        ServiceDeliveryErrorCode.SERVICE_DELIVERY_NOT_FOUND
      );
    }

    try {
      // Delete the linked progress note
      await progressNoteService.deleteProgressNote({
        id: serviceDelivery.progressnote!,
        company,
      });

      // Delete the linked shift record
      await shiftRecordService.deleteShiftRecord({
        id: serviceDelivery.shift!,
        company,
        deleteRecurring: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      // Delete the serviceDelivery by id and company
      await ServiceDeliveryModel.destroy({
        where: { id, company },
      });
    }

    return serviceDelivery;
  }

  async getServiceDeliveryById(props: GetServiceDeliveryByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the serviceDelivery by id and company
    const serviceDelivery = await ServiceDeliveryModel.findOne({
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
          model: ClientProfileModel,
          as: "Client",
        },
        {
          model: ServiceModel,
          as: "Service",
        },
        {
          model: ShiftRecordModel,
          as: "Shift",
        },
      ],
    });

    // If no serviceDelivery has been found, then throw an error
    if (!serviceDelivery) {
      throw new CustomError(
        404,
        ServiceDeliveryErrorCode.SERVICE_DELIVERY_NOT_FOUND
      );
    }

    return serviceDelivery;
  }

  async getServiceDeliveries(props: GetServiceDeliveriesProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: ServiceModel,
        as: "Service",
        where: {
          ...filters["Service"],
        },
      },
      {
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
          ...clientFilters,
        },
      },
    ];

    // Count total serviceDeliveries in the given company
    const count = await ServiceDeliveryModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all serviceDeliveries for matching props and company
    const data = await ServiceDeliveryModel.findAll({
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

export default new ServiceDeliveryService();
