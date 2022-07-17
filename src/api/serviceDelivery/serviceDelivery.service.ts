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
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { ServiceModel } from "../service";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { ProgressNote, progressNoteService } from "../progressNote";
import { ShiftRecord, shiftRecordService } from "../shiftRecord";
import { ShiftRecordStatus } from "../shiftRecord/shiftRecord.constant";
import makeMoment from "../../components/moment";

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

    // Create shift
    const startDate = makeMoment(props.date).format("YYYY-MM-DD");
    const startTime = props.startTime;
    const tStartDateTime = startDate + " " + startTime;
    const startDateTime = makeMoment(tStartDateTime).toDate();

    const endTime = props.endTime;
    const tEndDateTime = startDate + " " + endTime;
    const endDateTime = makeMoment(tEndDateTime).toDate();

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

    const startDate = makeMoment(props.date).format("YYYY-MM-DD");
    const startTime = props.startTime;
    const tStartDateTime = startDate + " " + startTime;
    const startDateTime = makeMoment(tStartDateTime).toDate();

    const endTime = props.endTime;
    const tEndDateTime = startDate + " " + endTime;
    const endDateTime = makeMoment(tEndDateTime).toDate();

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
    };

    try {
      // Find progress notes by id
      if (shift) {
        const existingShiftRecord = await shiftRecordService.getShiftRecordById(
          {
            id: shift,
            company: props.company,
          }
        );

        const updateShiftRecordProp = {
          ...updateShiftProp,
          id: existingShiftRecord.id,
        };
        // If found, update it
        shiftRecord = await shiftRecordService.updateShiftRecord(
          updateShiftRecordProp
        );
      } else {
        shiftRecord = await shiftRecordService.createShiftRecord(
          updateShiftProp
        );
      }
    } catch (error) {
      // Otherwise, create a new one
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

    // Update progress note
    const progressNote = await this._updateProgressNote(
      props,
      serviceDelivery.progressnote!
    );

    // Update shift record
    const shiftRecord = await this._updateShift(props, serviceDelivery.shift!);

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

    // Delete the serviceDelivery by id and company
    await ServiceDeliveryModel.destroy({
      where: { id, company },
    });

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
