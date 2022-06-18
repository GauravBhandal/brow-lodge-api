import moment from "moment";

import makeMoment from "../components/moment";
import { CreateShiftRecordInBulkProps } from "../api/shiftRecord";

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const addTimeToDate = (date: any, number: any, type: any) => {
  const newDate = makeMoment(date).add(number, type);
  return newDate;
};

export const formatDateToString = (date: any) =>
  makeMoment(date).format("YYYY-MM-DD");

const convertDateToMoment = (date: string) => makeMoment(date).format();

const addDaysInDate = (date: string | Date, number: number, type: any) =>
  makeMoment(date).add(number, type).format();

const specificDay = (date: string, numberOfWeeks: number, day: string) => {
  const dayOfDate = makeMoment(date).isoWeekday() === 7;
  let finalDate: any = date;
  if (dayOfDate && day !== "sunday") {
    finalDate = makeMoment(date).add(1, "weeks");
  } else if (day === "sunday") {
    finalDate = makeMoment(date).add(-1, "weeks");
  }
  return makeMoment(finalDate)
    .add(numberOfWeeks, "weeks")
    .isoWeekday(day)
    .format();
};

export const daysDifference = (repeatStartDate: any, repeatEndDate: any) =>
  makeMoment(repeatEndDate).diff(makeMoment(repeatStartDate), "days");

export const getMinutesDiff = (startDate: any, endDate: any) => {
  const start = makeMoment(startDate);
  const end = makeMoment(endDate);
  return moment.duration(end.diff(start)).asMinutes();
};

const getOccurrenceswithEndDate = (
  repeatStartDate: any,
  repeatEndDate: any,
  every: any,
  frequency: any
) => {
  repeatStartDate = makeMoment(repeatStartDate).startOf("day");
  let days = daysDifference(repeatStartDate, repeatEndDate) + 1;
  if (frequency === "weekly") {
    days = Math.floor((days - 1) / 7) + 1;
  }
  days = Math.floor((days - 1) / every) + 1;
  return days;
};

const isDaySelected = (data: any, value: any) => {
  const isDayPresent = data.repeat.days.find((day: any) => day === value);
  return isDayPresent;
};

export const generateShiftServices = (shiftRecord: any, props: any) => {
  const dayDifference = daysDifference(
    props.startDateTime,
    shiftRecord.startDateTime
  );
  const services = props.services.map((singleService: any) => ({
    startTime: addTimeToDate(singleService.startTime, dayDifference, "days"),
    service: singleService.service,
  }));
  return services;
};

export const createShifts = (
  data: CreateShiftRecordInBulkProps
): CreateShiftRecordInBulkProps[] => {
  const { repeat, startDateTime, endDateTime, company, client, staff } = data;
  const { frequency, every } = repeat;

  const repeatStartDate = convertDateToMoment(startDateTime as any);
  const repeatEndDate =
    repeat.repeatEndDate && convertDateToMoment(repeat.repeatEndDate);
  const occurrences =
    repeat.occurrences ||
    getOccurrenceswithEndDate(repeatStartDate, repeatEndDate, every, frequency);
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
      if (repeatEndDate) {
        if (daysDifference(shiftStartDateTime, repeatEndDate) >= 0) {
          finalResult.push({
            company,
            client,
            staff,
            break: data.break,
            startDateTime: shiftStartDateTime,
            endDateTime: shiftEndDateTime,
            repeat,
          });
        }
      } else {
        finalResult.push({
          company,
          client,
          staff,
          break: data.break,
          startDateTime: shiftStartDateTime,
          endDateTime: shiftEndDateTime,
          repeat,
        });
      }
    }
  } else {
    for (let day = 0; day < 7; day++) {
      if (isDaySelected(data, daysOfWeek[day])) {
        const getMinutes = getMinutesDiff(startDateTime, endDateTime);

        for (let i = 0; i < occurrences; i++) {
          const shiftStartDateTime = specificDay(
            repeatStartDate,
            i * every,
            daysOfWeek[day]
          );

          const shiftEndDateTime = addDaysInDate(
            shiftStartDateTime,
            getMinutes,
            "minutes"
          );
          if (repeatEndDate) {
            if (
              daysDifference(repeatStartDate, shiftStartDateTime) >= 0 &&
              daysDifference(shiftStartDateTime, repeatEndDate) >= 0
            ) {
              finalResult.push({
                company,
                client,
                staff,
                break: data.break,
                startDateTime: shiftStartDateTime,
                endDateTime: shiftEndDateTime,
                repeat,
              });
            }
          } else if (daysDifference(repeatStartDate, shiftStartDateTime) >= 0) {
            finalResult.push({
              company,
              client,
              staff,
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
