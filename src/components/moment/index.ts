import moment from "moment-timezone";

const makeMoment = (date?: any) =>
  date
    ? moment(date).tz("Australia/Adelaide")
    : moment().tz("Australia/Adelaide");

export default makeMoment;
