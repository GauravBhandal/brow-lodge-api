import moment from "moment-timezone";

const makeMoment = (date?: any, timezone?: string) =>
  date
    ? moment.tz(date, timezone || "Australia/Adelaide")
    : moment.tz(timezone || "Australia/Adelaide");

export default makeMoment;
