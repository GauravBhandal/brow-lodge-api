import makeMoment from "../moment";

export const convertToFormattedTime = (time:any,timezone?:string) =>
  time ? makeMoment(time,timezone).format("HH:mm") : null;