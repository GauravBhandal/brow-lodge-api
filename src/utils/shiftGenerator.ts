import moment from "moment";

import makeMoment from "../components/moment";
import { CreateShiftRecordInBulkProps } from "../api/shiftRecord";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

/**
 * Add time in date
 * @param date
 * @param number like quantity of days or min to add
 * @param type like is it day, week or month
 */
export const addTimeToDate = (date: any, number: any, type: any) => {
  const newDate = makeMoment(date).add(number, type);
  return newDate;
};

// Returns the date with format 'YYYY-MM-DD'
export const formatDateToString = (date: any) =>
  makeMoment(date).format("YYYY-MM-DD");

//Convert any date to formatted date
const convertDateToMoment = (date: string) => makeMoment(date).format();

// Add days in date
const addDaysInDate = (date: string | Date, number: number, type: any) =>
  makeMoment(date).add(number, type).format();

// returns the specific day date of week e.g any date with sunday then returns date of that sunday in the week
const specificDay = (date: string, numberOfWeeks: number, day: string) => {
  const dayOfDate = makeMoment(date).isoWeekday() === 7;
  let finalDate: any = date;
  if (dayOfDate) {
    finalDate = makeMoment(date).add(1, "weeks");
  }
  return makeMoment(finalDate)
    .add(numberOfWeeks, "weeks")
    .isoWeekday(day)
    .format();
};

// returns the difference of days in two dates
export const daysDifference = (repeatStartDate: any, repeatEndDate: any) =>
  makeMoment(repeatEndDate).diff(makeMoment(repeatStartDate), "days");

// returns difference of minutes between two dates
export const getMinutesDiff = (startDate: any, endDate: any) => {
  const start = makeMoment(startDate);
  const end = makeMoment(endDate);
  return moment.duration(end.diff(start)).asMinutes();
};

// If only end date is present for repeat shift then will return number of occurrences
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

// Function, is that day present in repeat shift
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
  const { repeat, startDateTime, endDateTime, company, client, staff, status } =
    data;
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
        // shift start date of every occurence
        repeatStartDate,
        i * every,
        "days"
      );
      const shiftEndDateTime = addDaysInDate(
        //Add minutes diff to start time of that shift
        shiftStartDateTime,
        getMinutes,
        "minutes"
      );
      //check that repeat end date is present
      if (repeatEndDate) {
        //Check if date is less than endDate or not
        if (daysDifference(shiftStartDateTime, repeatEndDate) >= 0) {
          finalResult.push({
            company,
            client,
            staff,
            break: data.break,
            status,
            startDateTime: shiftStartDateTime,
            endDateTime: shiftEndDateTime,
            repeat,
          });
        }
      } else {
        //If only frequency is present rather than end date
        finalResult.push({
          company,
          client,
          staff,
          break: data.break,
          status,
          startDateTime: shiftStartDateTime,
          endDateTime: shiftEndDateTime,
          repeat,
        });
      }
    }
  } else {
    //loop for every day of week
    for (let day = 0; day < 7; day++) {
      // check whether the day is present in repeat shift
      if (isDaySelected(data, daysOfWeek[day])) {
        const getMinutes = getMinutesDiff(startDateTime, endDateTime);

        for (let i = 0; i < occurrences; i++) {
          // get the specific day of any date
          const shiftStartDateTime = specificDay(
            repeatStartDate,
            i * every,
            daysOfWeek[day]
          );

          //Add minutes diff to the startdate for end date
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
                status,
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
              status,
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
