import { omit as _omit } from "lodash";
import { literal, Op } from "sequelize";
import { orderBy as _orderBy } from "lodash";

import StaffUnavailabilityModel from "./staffUnavailability.model";
import {
  CreateStaffUnavailabilityProps,
  DeleteStaffUnavailabilityProps,
  GetStaffUnavailabilityByIdProps,
  GetStaffUnavailabilitysProps,
  StaffUnavailability,
} from "./staffUnavailability.types";
import { CustomError } from "../../components/errors";
import StaffUnavailabilityErrorCode from "./staffUnavailability.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel, companyService } from "../company";
import { getFilters } from "../../components/filters";
import { StaffProfileModel } from "../staffProfile";
import { createUnavailableEntries } from "../../utils/unavailabilityGenerator";
import { addDaysInDate, formatDateToString, getMinutesDiff } from "../../utils/shiftGenerator";
import { convertToFormattedTime } from "../../components/utils/date";
import { uuid } from "aws-sdk/clients/customerprofiles";
import makeMoment from "../../components/moment";

const maximumOfTwoStrings=(string1:string,string2:string)=> {
  if(string1>=string2)
  {
    return string1;
  }
  return string2;
}

const getMergedTimeInterval = (timeIntervals:any=[]) => {

  const sortedTimeIntervals = _orderBy(
    timeIntervals,
      ["startTime"],
      ["asc"]
    );

    const finalTimeIntervals=[];
    finalTimeIntervals.push(sortedTimeIntervals[0]);
    let index=0;
    for(let i=1;i<sortedTimeIntervals.length;i++)
    {
      if(finalTimeIntervals[index].endTime>=sortedTimeIntervals[i].startTime)
      {
        finalTimeIntervals[index].endTime=maximumOfTwoStrings(finalTimeIntervals[index].endTime,sortedTimeIntervals[i].endTime);
      } else {
        index++;
        finalTimeIntervals.push(sortedTimeIntervals[i]);
      }
    }

    return finalTimeIntervals;
    
}

const addTimeInterval=(
  dateList:any, 
  item: {
    startDateTime: Date|string,
    endDateTime:Date|string,
    id:uuid|string,
    profile:any
})=>{
  const {startDateTime,endDateTime,id,profile}=item;
  const startDate =  formatDateToString(startDateTime,'');
  const endDate =  formatDateToString(endDateTime,'');

  if(!dateList[id])
  {
    dateList[id]={};
  }

  if(!dateList[id]['profile'])
  {
    dateList[id]['profile']={
      ...profile?.dataValues
    }
  }

  if(!dateList[id][startDate])
  {
    dateList[id][startDate]=[];
  }

  if(!dateList[id][endDate])
  {
    dateList[id][endDate]=[];
  }

  const startTime = convertToFormattedTime(startDateTime);
  const endTime = convertToFormattedTime(endDateTime);

  if(startDate!==endDate)
  {
    dateList[id][startDate]=[...dateList[id][startDate],{startTime,endTime:'23:59'}]
    dateList[id][endDate]=[...dateList[id][endDate],{startTime:'00:00',endTime}]
  } else {
    dateList[id][startDate]=[...dateList[id][startDate],{startTime,endTime}]
  }
}

const getUnavailableStaffList = (UnavailabilityList:StaffUnavailability[],timezone:string|undefined) =>{
  const dateList:any={};
  UnavailabilityList.forEach((item:StaffUnavailability)=>{
    const {
      repeat,
      startDateTime,
      endDateTime,
      company,
      staff,
      Staff,
    } = item;
    if(item.repeat)
    {
      const getRepeatDataConfig=createUnavailableEntries({
        repeat,
        startDateTime,
        endDateTime,
        company,
        staff,
        timezone,
      })
      getRepeatDataConfig.forEach(repeatShift=>{
        const {
          startDateTime: repeatStartTime,
          endDateTime: repeatEndTime,
          staff: staffId,
        }=repeatShift

        addTimeInterval(dateList, {
          startDateTime:repeatStartTime,
          endDateTime:repeatEndTime,
          id:staffId,
          profile:Staff
        })
      })

    } else {
      addTimeInterval(dateList,{
        startDateTime,
        endDateTime,
        id:staff,
        profile:Staff
      })
    }
    
  })
  Object.keys(dateList).forEach(staff=>{
    Object.keys(dateList[staff]).forEach(date=>{
      if(date!=='profile'){
      dateList[staff][date]=[...getMergedTimeInterval(dateList[staff][date])];
      }
    })
    
  })

  return dateList;

}


class StaffUnavailabilityService {

  async createStaffUnavailability(props: CreateStaffUnavailabilityProps) {
    // Create a new staffUnavailability
    const staffUnavailability = await StaffUnavailabilityModel.create(props);

    return staffUnavailability;
  }


  async deleteStaffUnavailability(props: DeleteStaffUnavailabilityProps) {
    // Props
    const { id, company } = props;
    // Find  the staffUnavailability by id and company
    const staffUnavailability = await StaffUnavailabilityModel.findOne({
      where: { id, company },
    });
    // if staffUnavailability has not been found, throw an error
    if (!staffUnavailability) {
      throw new CustomError(404, StaffUnavailabilityErrorCode.STAFF_UNAVAILABILITY_NOT_FOUND);
    }


    // Find and delete the staffUnavailability by id and company
    const deletedStaffUnavailability = await StaffUnavailabilityModel.destroy({
      where: { id, company },
    });
    return deletedStaffUnavailability;
    
  }

  async getStaffUnavailabilityById(props: GetStaffUnavailabilityByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the staffUnavailability by id and company
    const staffUnavailability = await StaffUnavailabilityModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          through: {
            attributes: [],
          },
          as: "Staff",
        },
      ],
    });

    // If no staffUnavailability has been found, then throw an error
    if (!staffUnavailability) {
      throw new CustomError(404, StaffUnavailabilityErrorCode.STAFF_UNAVAILABILITY_NOT_FOUND);
    }

    return staffUnavailability;
  }

  async getStaffUnavailabilitys(props: GetStaffUnavailabilitysProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
    ];

    // Find all staffUnavailabilitys for matching props and company
    const unavailabilityList = await StaffUnavailabilityModel.findAll({
      // offset, We don't need pagination for this endpoint
      // limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    const filteredList=unavailabilityList.filter((entry:any)=>{
      const { repeat = {}, startDateTime = "", endDateTime = "" }=entry;
      let endDate = endDateTime;
      if(repeat){
        const {repeatEndDate = "", every = 1, frequency = "daily", occurrences = 0 } = repeat || {};
        endDate = repeatEndDate;
        if(occurrences > 0)
        {
          const interval = (frequency === "daily" ? 1 : 7 ) * every * occurrences;
          const getMinutes = getMinutesDiff(startDateTime, endDateTime, companyData.timezone);
          const startDate = addDaysInDate(
            startDateTime,
            interval,
            "days",
            companyData.timezone
          );
  
          endDate=addDaysInDate(
            startDate,
            getMinutes,
            "minutes",
            companyData.timezone
          );
        }
      }
      
      const todayDate = makeMoment(new Date(),companyData.timezone);
      const endDateTillMid = makeMoment(endDate,companyData.timezone).endOf("day");
      
      return getMinutesDiff(todayDate,endDateTillMid,companyData.timezone) >= 0;
    })

    const response = getPagingData({ count:filteredList.length, rows: filteredList }, page, limit);

    return response;
  }

  async getStaffUnavailabilityList(props: GetStaffUnavailabilitysProps) {
    // Props
    const companyData = await companyService.getCompanyById({
      company: props.company,
    });
    const {  sort, where, company } = props;

    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
    ];

    // Find all staffUnavailabilitys for matching props and company
    const UnavailabilityList = await StaffUnavailabilityModel.findAll({
      // offset, We don't need pagination for this endpoint
      // limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    const getDateList=getUnavailableStaffList(UnavailabilityList, companyData.timezone);

    const response = {data:getDateList};

    return response;
  }

}

export default new StaffUnavailabilityService();