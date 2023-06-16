import React, {useEffect, useContext, useState, createContext} from 'react'
import ChooseDaysOffForm from '../ChooseDaysOffForm'
import { dateUtils } from '../../features/utils/dateUtils'
import { EmpsInGroupContext } from './EmpsInGroup'
import { DateContext } from './ChooseDate'
import GenerateButton from './GenerateButton'

export const DaysOffContext = createContext();

const ChooseDaysOff = () => {

    const empsInGroup = useContext(EmpsInGroupContext);
    const date = useContext(DateContext);

    const [daysOff, setDaysOff] = useState([]);

    const handleDaysOff = (dayOffId)=>setDaysOff( prev=> {
      const newDaysOff = JSON.parse(JSON.stringify(prev));
      const dayOff = newDaysOff.find( ({id})=>id===dayOffId );
      dayOff.dayOff = !dayOff.dayOff;

      return newDaysOff;
    });

    const daysCount = dateUtils.daysInMonth(date.year, date.month);

    // {
    //  id: 1,
    //  fullName: 'Jan Kowalski',
    //  Date: 21.05.2023,
    //  dayOff: true
    // }

    useEffect(()=>{
      const dates = dateUtils.datesArray(date.year, date.month);

      const newDaysOff = [];
      
      dates.forEach( (date) => {
        empsInGroup.forEach( (emp) => {
          newDaysOff.push({
            id: `${emp.id}-${date}`,
            empId: emp.id,
            date: date,
            dayOff: false
          })
        })
      })

      setDaysOff(newDaysOff);
    
    },[empsInGroup, date]);

  return (
    <>
          <p>Dni w miesiącu: {daysCount}</p>

          <ChooseDaysOffForm employees={empsInGroup} daysOff={daysOff} handleDaysOff={handleDaysOff} />

          <GenerateButton daysOff={daysOff} />
    </>
  )
}

export default ChooseDaysOff