import React, { useEffect } from 'react'
import DropDown from '../form/DropDown'
//import { parseAndSetObj } from '../../features/utils/formUtils'
import { dateUtils, dateExists } from '../../features/utils/dateUtils'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import ErrorList from '../ErrorList'
import { useState } from 'react'

const ChooseDate = ({setDate, date, children}) => {

    const [yearsMonths, {getData: getYearsMonths}] = useGetAndChange({url:"/api/schedule/years-months-with-shifts"});

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
        {shiftsExists === false && children}
    </>
  )
}

export default ChooseDate