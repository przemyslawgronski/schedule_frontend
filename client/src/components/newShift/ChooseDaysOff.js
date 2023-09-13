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

    useEffect(()=>resetSolution(),[resetSolution, daysOff]); // Reset solution if daysOff changed

    useEffect(()=>{

      const dates = dateUtils.datesArray(date.year, date.month);

      const newDaysOff = new Map();

      dates.forEach( (date) => {
        newDaysOff.set(date, new Map());
        empsInGroup.forEach( (emp) => {
          newDaysOff.get(date).set(emp.id, false);
        })
      });

      setDaysOff(newDaysOff);
    
    },[empsInGroup, date]);

    if(daysOff.length===0) return null;

    const handleDaysOff = (dateToChange, empIdToChange)=>setDaysOff( prev=> {
      const newDaysOff = structuredClone(prev);
      const valueToggle = newDaysOff.get(dateToChange).get(empIdToChange);
      newDaysOff.get(dateToChange).set(empIdToChange, !valueToggle);
      return newDaysOff;
    });

    // eg.: Map {
    //   12 => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
    //   8 => [ 1, 8, 9, 10 ]
    // }
    const empIdToDaysOff = new Map();

    daysOff.forEach((empIdToDayOff, date) => {
      empIdToDayOff.forEach((dayOff, empId) => {
        if(!empIdToDaysOff.has(empId)) empIdToDaysOff.set(empId, []);
        if(dayOff) empIdToDaysOff.get(empId).push(new Date(date).getDate());
      })
    });

  return (
    <>
          <p>Dni w miesiącu: {daysOff.size}</p>

          <ChooseDaysOffForm
            employees={empsInGroup}
            daysOff={daysOff}
            handleDaysOff={handleDaysOff}
            empIdToDaysOff={empIdToDaysOff}
            />

          <GenerateButton daysOff={daysOff} empIdToDaysOff={empIdToDaysOff}/>
    </>
  )
}

export default ChooseDaysOff