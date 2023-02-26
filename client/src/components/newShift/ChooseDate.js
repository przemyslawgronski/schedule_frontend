import React, { useEffect, createContext, useContext } from 'react'
import DropDown from '../form/DropDown'
import { dateUtils, dateExists } from '../../features/utils/dateUtils'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import ErrorList from '../ErrorList'
import { useState } from 'react'
import { GroupIdContext } from './ChooseGroup'

export const DateContext = createContext();

const ChooseDate = ({children}) => {

    const [date, setDate] = useState({
      year: dateUtils.nextMonthsYear(),
      month: dateUtils.nextMonth(),
    });

    const groupId = useContext(GroupIdContext);

    const [yearsMonths, {getData: getYearsMonths}] = useGetAndChange({url:`/api/schedule/groups/${groupId}/years-months-with-shifts`});

    const [shiftsExists, setShiftsExists] = useState(null);

    const onChangeFunc = (event) => {
        setDate(prev => ({...prev, [event.target.name]: JSON.parse(event.target.value)}));
        getYearsMonths();
      }

      useEffect(()=>{
        getYearsMonths();
      },[getYearsMonths])

      useEffect(()=>{ 
        if(date?.year && yearsMonths?.data) setShiftsExists(dateExists(date, yearsMonths.data));
      },[date, yearsMonths.data])

      const errors = [yearsMonths.error].filter(Boolean);

      if (errors.length) {
          return <ErrorList errors={errors.map(({ message }) => message)} />;
      }

  return (
    <>
        <DropDown label="Wybierz rok" name="year" defaultVal={dateUtils.nextMonthsYear()}
        options={dateUtils.yearsArray(5)} onChangeFunc={onChangeFunc}/>

        <DropDown label="Wybierz miesiąc" name="month" defaultVal={dateUtils.nextMonth()} options={dateUtils.monthArray}
        objText={dateUtils.monthName} onChangeFunc={onChangeFunc}/>

        {shiftsExists == null && <p>Ładowanie...</p>}
        {shiftsExists && <p>W tym miesiącu istnieją już zapisane zmiany</p>}
        {shiftsExists === false && 
          <DateContext.Provider value={date}>
            {children}
          </DateContext.Provider>
        }
    </>
  )
}

export default ChooseDate