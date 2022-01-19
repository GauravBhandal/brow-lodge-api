import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createVehicleLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    odometerReadingStart: Joi.number().required(),
    odometerReadingEnd: Joi.number().required(),
    purposeOfTheJourney: Joi.string().required(),
    totalKm: Joi.number().required(),
    vehicle: Joi.string().valid("private", "company", "other").required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editVehicleLogSchema = wrapSchema({
  params: Joi.object().keys({ vehicleLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    odometerReadingStart: Joi.number().required(),
    odometerReadingEnd: Joi.number().required(),
    purposeOfTheJourney: Joi.string().required(),
    totalKm: Joi.number().required(),
    vehicle: Joi.string().valid("private", "company", "other").required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const deleteVehicleLogSchema = wrapSchema({
  params: Joi.object().keys({
    vehicleLogId: requiredUUIDSchema(),
  }),
});

const getVehicleLogByIdSchema = wrapSchema({
  params: Joi.object().keys({
    vehicleLogId: requiredUUIDSchema(),
  }),
});

const getVehicleLogSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createVehicleLog: joiMiddleware(createVehicleLogSchema),
  editVehicleLog: joiMiddleware(editVehicleLogSchema),
  deleteVehicleLog: joiMiddleware(deleteVehicleLogSchema),
  getVehicleLogById: joiMiddleware(getVehicleLogByIdSchema),
  getVehicleLogs: joiMiddleware(getVehicleLogSchema),
};