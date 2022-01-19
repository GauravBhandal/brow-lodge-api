import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createVehicleLogSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    odometer_reading_start: Joi.number().required(),
    odometer_reading_end: Joi.number().required(),
    purpose_of_the_journey: Joi.string().required(),
    total_km: Joi.number().required(),
    vehicle: Joi.string().valid("private", "company", "other").required(),
    staff: requiredUUIDSchema(),
    client: requiredUUIDSchema(),
  }),
});

const editVehicleLogSchema = wrapSchema({
  params: Joi.object().keys({ vehicleLogId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    odometer_reading_start: Joi.number().required(),
    odometer_reading_end: Joi.number().required(),
    purpose_of_the_journey: Joi.string().required(),
    total_km: Joi.number().required(),
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
