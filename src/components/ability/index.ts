import { AbilityBuilder, Ability, ForbiddenError } from "@casl/ability";
import { Response, Request, NextFunction } from "express";

import { userService, User } from "../../api/user";
import { CustomError } from "../errors";

const ACTIONS = ["read", "create", "update", "delete"];

const defineRulesFor = async (userObject: User) => {
  const { can, rules } = new AbilityBuilder(Ability);

  const roles = userObject?.Roles;
  if (roles && roles.length) {
    roles.forEach((role) => {
      if (role.permissions) {
        Object.keys(role.permissions).forEach((subject: any) => {
          ACTIONS.forEach((action) => {
            if (role.permissions && role.permissions[subject].actions[action]) {
              can(action, subject);
            }
          });
        });
      }
    });
  }

  return rules;
};

const defineAbilityFor = async (userObject: User) => {
  const rules = await defineRulesFor(userObject);
  return new Ability(rules);
};

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
  | "whoLog"
  | "meetingLog"
  | "clientRisk"
  | "staffSleepDisturbance"
  | "resource"
  | "attachment"
  | "leaseAndUtilityLog"
  | "maintenanceLog"
  | "feedback";

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

export const provideAbility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the userId and companyId exists
  if (req?.auth?.userId && req?.auth?.companyId) {
    // Props
    const { userId, companyId } = req.auth;
    const props = {
      id: userId,
      company: companyId,
    };

    // Get user by id and company
    const user = await userService.getUserById(props);
    const userObject = user.toJSON() as User;

    // Create ability for this user and add it to request
    req.ability = await defineAbilityFor(userObject);
  }

  next();
};
