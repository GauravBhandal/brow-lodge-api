import { Response, Request, NextFunction } from "express";
import { ForbiddenError } from "@casl/ability";

import { CustomError } from "../errors";

type Action = "read" | "create" | "update" | "delete";
type Subject =
  | "user"
  | "role"
  | "company"
  | "clientProfile"
  | "staffProfile"
  | "progressNote"
  | "bloodGlucoseLog"
  | "bloodPressureLog"
  | "bowelLog"
  | "weightLog"
  | "sleepLog"
  | "temperatureLog"
  | "prnAdminLog"
  | "prnBalanceLog"
  | "oxygenSaturationLog"
  | "seizureLog"
  | "clientBehaviour"
  | "transportBehaviour"
  | "vehicleLog"
  | "injuryReport"
  | "expenseReimbursement"
  | "doctorVisit"
  | "clientAsset"
  | "companyAsset"
  | "repairRequest"
  | "conflictOfInterest"
  | "corporateRisk"
  | "whsLog"
  | "meetingLog"
  | "clientRisk"
  | "staffSleepDisturbance"
  | "resource"
  | "attachment"
  | "leaseAndUtilityLog"
  | "maintenanceLog"
  | "feedback"
  | "clientDocumentCategory"
  | "clientDocumentType"
  | "clientDocument"
  | "staffDocumentCategory"
  | "staffDocumentType"
  | "staffDocument"
  | "incidentReport"
  | "team"
  | "shiftType"
  | "shiftRecord"
  | "incidentType"
  | "keyDecision"
  | "restrictivePracticeLog"
  | "companyExpense"
  | "progressReport"
  | "policyReview"
  | "legislationRegister"
  | "template"
  | "policy";

export const canDo = (action: Action, subject: Subject) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.ability) {
      ForbiddenError.from(req.ability).throwUnlessCan(action, subject);
    } else {
      throw new CustomError(401, "INVALID_AUTH_TOKEN");
    }
    next();
  };
};
