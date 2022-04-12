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

const addDaysInDate = (date: string | Date, number: number, type: any) =>
  moment(date).add(number, type).format();

const specificDay = (date: string, numberOfWeeks: number, day: number) =>
  moment(date).add(numberOfWeeks, "weeks").isoWeekday(day).format();

const daysDifference = (repeatStartDate: any, repeatEndDate: any) =>
  moment(repeatEndDate).diff(moment(repeatStartDate), "days");

const getMinutesDiff = (startDate: any, endDate: any) => {
  const start = moment(startDate);
  const end = moment(endDate);
  return moment.duration(end.diff(start)).asMinutes();
};

const getOccurrenceswithEndDate = (
  repeatStartDate: any,
  repeatEndDate: any,
  every: any,
  frequency: any
) => {
  repeatStartDate = moment(repeatStartDate).startOf("day");
  let days = daysDifference(repeatStartDate, repeatEndDate);
  if (frequency === "weekly") {
    days = Math.floor(days / 7);
  }
  days = Math.floor(days / every);
  return days + 1;
};

const isDaySelected = (data: any, value: any) => {
  const isDayPresent = data.repeat.days.find((day: any) => day === value);
  return isDayPresent;
};

export const createShifts = (
  data: CreateShiftRecordInBulkProps
): CreateShiftRecordInBulkProps[] => {
  const { repeat, startDateTime, endDateTime, company, client, staff, types } =
    data;
  const { frequency, every } = repeat;

  const repeatStartDate = convertDateToMoment(startDateTime as any);
  const repeatEndDate =
    repeat.repeatEndDate && convertDateToMoment(repeat.repeatEndDate);
  const occurrences =
    repeat.occurrences ||
    getOccurrenceswithEndDate(repeatStartDate, repeatEndDate, every, frequency);
  console.log("occurrences", occurrences);
  const finalResult = [];

  if (frequency === "daily") {
    const getMinutes = getMinutesDiff(startDateTime, endDateTime);
    for (let i = 0; i < occurrences; i++) {
      const shiftStartDateTime = addDaysInDate(
        repeatStartDate,
        i * every,
        "days"
      );
      const shiftEndDateTime = addDaysInDate(
        shiftStartDateTime,
        getMinutes,
        "minutes"
      );
      finalResult.push({
        company,
        client,
        staff,
        types,
        break: data.break,
        startDateTime: shiftStartDateTime,
        endDateTime: shiftEndDateTime,
        repeat,
      });
    }
  } else {
    for (let day = 0; day < 7; day++) {
      if (isDaySelected(data, daysOfWeek[day])) {
        const getMinutes = getMinutesDiff(startDateTime, endDateTime);

        for (let i = 0; i < occurrences; i++) {
          const shiftStartDateTime = specificDay(
            repeatStartDate,
            i * every,
            day
          );

          const shiftEndDateTime = addDaysInDate(
            shiftStartDateTime,
            getMinutes,
            "minutes"
          );
          if (daysDifference(repeatStartDate, shiftStartDateTime) >= 0) {
            finalResult.push({
              company,
              client,
              staff,
              types,
              break: data.break,
              startDateTime: shiftStartDateTime,
              endDateTime: shiftEndDateTime,
              repeat,
            });
          }
        }
      }
    }
  }
  return finalResult as any;
};
