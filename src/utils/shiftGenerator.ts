import moment, { Moment } from "moment";

import { CreateShiftRecordInBulkProps, ShiftRecord } from "../api/shiftRecord";

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const convertDateToMoment = (date: string) => moment(date).format();

const addDaysInDate = (date: string | Date, number: number) =>
  moment(date).add(number, "days").format();

const specificDay = (date: string, numberOfWeeks: number, day: number) =>
  moment(date).add(numberOfWeeks, "weeks").isoWeekday(day).format();

const generateShift = (date: string) => ({ shiftDate: date });

const daysDifference = (repeatStartDate: any, repeatEndDate: any) =>
  moment(repeatEndDate).diff(moment(repeatStartDate), "days");

const getOccurrenceswithEndDate = (
  repeatStartDate: any,
  repeatEndDate: any,
  every: any
) => {
  let days = daysDifference(repeatStartDate, repeatEndDate);
  days = Math.floor(days / every);
  return days + 1;
};

const isDaySelected = (data: any, value: any) => {
  switch (value) {
    case "sunday":
      return data.sunday;
    case "monday":
      return data.monday;
    case "tuesday":
      return data.tuesday;
    case "wednesday":
      return data.wednesday;
    case "thursday":
      return data.thursday;
    case "friday":
      return data.friday;
    case "saturday":
      return data.saturday;
    default:
      return false;
  }
};

export const createShifts = (
  data: CreateShiftRecordInBulkProps
): CreateShiftRecordInBulkProps[] => {
  const { repeat, startDateTime, endDateTime, company, client, staff, types } =
    data;
  const { frequency, every } = repeat;

  const repeatStartDate = convertDateToMoment(startDateTime);
  const repeatEndDate =
    repeat.repeatEndDate && convertDateToMoment(repeat.repeatEndDate);
  const occurrences =
    repeat.occurrences ||
    getOccurrenceswithEndDate(repeatStartDate, repeatEndDate, every);
  const finalResult = [];

  console.log("data", data);
  console.log("repeat", repeat);
  console.log("frequency", frequency);
  console.log("repeatStartDate", repeatStartDate);
  console.log("repeatEndDate", repeatEndDate);
  console.log("every", every);
  console.log("occurrences", occurrences);

  // if (frequency === "daily") {
  for (let i = 0; i < occurrences; i++) {
    const shiftStartDateTime = addDaysInDate(repeatStartDate, i * every);
    const shiftEndDateTime = addDaysInDate(endDateTime, i * every);
    finalResult.push({
      company,
      client,
      staff,
      types,
      startDateTime: shiftStartDateTime,
      endDateTime: shiftEndDateTime,
      repeat,
    });
  }
  // }
  // else {
  //   for (let day = 0; day < 7; day++) {
  //     if (isDaySelected(data, daysOfWeek[day])) {
  //       if (data.repeat.occurrences) {
  //         for (let i = 0; i < occurrences; i++) {
  //           const newDate = specificDay(repeatStartDate, i * every, day);
  //           if (daysDifference(repeatStartDate, newDate) >= 0) {
  //             finalResult.push(generateShift(newDate));
  //           }
  //         }
  //       } else {
  //         for (let i = 0; i < 7; i++) {
  //           const newDate = specificDay(repeatStartDate, i * every, day);
  //           if (
  //             daysDifference(repeatStartDate, newDate) >= 0 &&
  //             daysDifference(newDate, repeatEndDate) >= 0
  //           ) {
  //             finalResult.push(generateShift(newDate));
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  return finalResult;
};
