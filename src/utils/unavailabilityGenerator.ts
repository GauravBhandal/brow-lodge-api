import { CreateStaffUnavailabilityInBulkHelperProps, CreateStaffUnavailabilityInBulkProps } from "../api/staffUnavailability";
import { addDaysInDate, convertDateToMoment, daysDifference, daysOfWeek, getMinutesDiff, getOccurrenceswithEndDate, isDaySelected, specificDay } from "./shiftGenerator";

export const createUnavailableEntries = (
    data: CreateStaffUnavailabilityInBulkHelperProps
): CreateStaffUnavailabilityInBulkProps[] => {
    const {
        repeat,
        startDateTime,
        endDateTime,
        company,
        staff,
        timezone,
    } = data;
    const { frequency, every } = repeat;

    const repeatStartDate = convertDateToMoment(startDateTime as any, timezone);
    const repeatEndDate =
        repeat.repeatEndDate && convertDateToMoment(repeat.repeatEndDate, timezone);
    const occurrences =
        repeat.occurrences ||
        getOccurrenceswithEndDate(
            repeatStartDate,
            repeatEndDate,
            every,
            frequency,
            timezone
        );
    const finalResult = [];

    if (frequency === "daily") {
        const getMinutes = getMinutesDiff(startDateTime, endDateTime, timezone);
        for (let i = 0; i < occurrences; i++) {
            const shiftStartDateTime = addDaysInDate(
                // shift start date of every occurence
                repeatStartDate,
                i * every,
                "days",
                timezone
            );
            const shiftEndDateTime = addDaysInDate(
                //Add minutes diff to start time of that shift
                shiftStartDateTime,
                getMinutes,
                "minutes",
                timezone
            );
            //check that repeat end date is present
            if (repeatEndDate) {
                //Check if date is less than endDate or not
                if (daysDifference(shiftStartDateTime, repeatEndDate, timezone) >= 0) {
                    finalResult.push({
                        company,
                        staff,
                        startDateTime: shiftStartDateTime,
                        endDateTime: shiftEndDateTime,
                        repeat,
                    });
                }
            } else {
                //If only frequency is present rather than end date
                finalResult.push({
                    company,
                    staff,
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
                const getMinutes = getMinutesDiff(startDateTime, endDateTime, timezone);

                for (let i = 0; i < occurrences; i++) {
                    // get the specific day of any date
                    const shiftStartDateTime = specificDay(
                        repeatStartDate,
                        i * every,
                        daysOfWeek[day],
                        timezone
                    );

                    //Add minutes diff to the startdate for end date
                    const shiftEndDateTime = addDaysInDate(
                        shiftStartDateTime,
                        getMinutes,
                        "minutes",
                        timezone
                    );
                    if (repeatEndDate) {
                        if (
                            daysDifference(repeatStartDate, shiftStartDateTime, timezone) >=
                            0 &&
                            daysDifference(shiftStartDateTime, repeatEndDate, timezone) >= 0
                        ) {
                            finalResult.push({
                                company,
                                staff,
                                startDateTime: shiftStartDateTime,
                                endDateTime: shiftEndDateTime,
                                repeat,
                            });
                        }
                    } else if (
                        daysDifference(repeatStartDate, shiftStartDateTime, timezone) >= 0
                    ) {
                        finalResult.push({
                            company,
                            staff,
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