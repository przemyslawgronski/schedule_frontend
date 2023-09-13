import React, {useEffect, useContext, useState} from 'react'
import ChooseDaysOffForm from '../ChooseDaysOffForm'
import { dateUtils } from '../../features/utils/dateUtils'
import { EmpsInGroupContext } from './EmpsInGroup'
import { DateContext } from './ChooseDate'
import { SolutionContext } from './GetSolution'
import GenerateButton from './GenerateButton'

const ChooseDaysOff = () => {

    const empsInGroup = useContext(EmpsInGroupContext);
    const date = useContext(DateContext);
    const {resetSolution} = useContext(SolutionContext);

    const [daysOff, setDaysOff] = useState([]);

    const handleDaysOff = (dateToChange, empIdToChange)=>setDaysOff( prev=> {
      const newDaysOff = structuredClone(prev);
      const dayOff = newDaysOff.find( ({date, empId})=>date===dateToChange && empId===empIdToChange);
      dayOff.dayOff = !dayOff.dayOff;
      return newDaysOff;
    });

    useEffect(()=>resetSolution(),[resetSolution, daysOff]); // Reset solution if daysOff changed

    const daysCount = dateUtils.daysInMonth(date.year, date.month);

    useEffect(()=>{
      const dates = dateUtils.datesArray(date.year, date.month);

      const newDaysOff = [];
      
      dates.forEach( (date) => {
        empsInGroup.forEach( (emp) => {
          newDaysOff.push({
            empId: emp.id,
            date: date,
            dayOff: false
          })
        })
      })

      setDaysOff(newDaysOff);
    
    },[empsInGroup, date]);

    if(daysOff.length===0) return null;

  return (
    <>
          <p>Dni w miesiącu: {daysCount}</p>

          <ChooseDaysOffForm employees={empsInGroup} daysOff={daysOff} handleDaysOff={handleDaysOff} />

          <GenerateButton daysOff={daysOff} />
    </>
  )
}

export default ChooseDaysOff