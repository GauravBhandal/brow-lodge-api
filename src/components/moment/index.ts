import moment from "moment-timezone";

const makeMoment = (date?: any, timezone?: string) =>
  date
    ? moment.tz(date, timezone || "Australia/Adealide")
    : moment.tz(timezone || "Australia/Adealide");

export default makeMoment;
