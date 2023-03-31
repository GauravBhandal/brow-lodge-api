import makeMoment from "../moment";

export const convertToFormattedTime = (time:any) =>
  time ? makeMoment(time).format("HH:mm") : null;