import moment from "moment-timezone";

const makeMoment = (date?: any) =>
  date
    ? moment.tz(date, "Australia/Adelaide")
    : moment.tz("Australia/Adelaide");

export default makeMoment;
