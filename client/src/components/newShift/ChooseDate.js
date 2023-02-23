import React, { useEffect } from 'react'
import DropDown from '../form/DropDown'
import { parseAndSetObj } from '../../features/utils/formUtils'
import { dateUtils } from '../../features/utils/dateUtils'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import ErrorList from '../ErrorList'
import { useState } from 'react'

const ChooseDate = ({setForm, form, children}) => {

    const [yearsMonths, {getData: getYearsMonths}] = useGetAndChange({url:"/api/schedule/years-months-with-shifts"});

    const [shiftsExists, setShiftsExists] = useState(null);

    const onChangeFunc = (event) => {
        setForm(prev => parseAndSetObj(event, prev));
        getYearsMonths();
      }

      useEffect(()=>{
        getYearsMonths();
      },[getYearsMonths])

      const stringYear = form?.date?.year && String(form.date.year);
    
      // Months with saved shifts for selected year
      const shiftsMonths = yearsMonths?.data && stringYear && yearsMonths.data[stringYear];
  
      // shiftsMonths - 0 based array of months with saved shifts
      //form.date.month+1 - 1 based month number
      const already_exists = shiftsMonths && shiftsMonths.includes(form.date.month+1)

      useEffect(()=>{ 
        setShiftsExists(already_exists);
      },[already_exists])

      const errors = [yearsMonths.error].filter(Boolean);

      if (errors.length) {
          return <ErrorList errors={errors.map(({ message }) => message)} />;
      }

  return (
    <>
        <DropDown label="Wybierz rok" name="date.year" defaultVal={dateUtils.nextMonthsYear()}
        options={dateUtils.yearsArray(5)} onChangeFunc={onChangeFunc}/>

        <DropDown label="Wybierz miesiąc" name="date.month" defaultVal={dateUtils.nextMonth()} options={dateUtils.monthArray}
        objText={dateUtils.monthName} onChangeFunc={onChangeFunc}/>

        {shiftsExists == null && <p>Ładowanie...</p>}
        {shiftsExists && <p>W tym miesiącu istnieją już zapisane zmiany</p>}
        {shiftsExists === false && children}
    </>
  )
}

export default ChooseDate