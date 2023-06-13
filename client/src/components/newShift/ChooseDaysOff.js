import React, {useEffect, useContext, useState, createContext} from 'react'
import ChooseDaysOffForm from '../ChooseDaysOffForm'
import { dateUtils } from '../../features/utils/dateUtils'
import { EmpsInGroupContext } from './EmpsInGroup'
import { DateContext } from './ChooseDate'
import GenerateButton2 from './GenerateButton2'

export const DaysOffContext = createContext();

const ChooseDaysOff = ({children}) => {

    const empsInGroup = useContext(EmpsInGroupContext);
    const date = useContext(DateContext);

    const [daysOff, setDaysOff] = useState([]);

    const handleDaysOff = (dayOffId)=>setDaysOff( prev=> {
      const newDaysOff = JSON.parse(JSON.stringify(prev));
      const dayOff = newDaysOff.find( ({id})=>id===dayOffId );
      dayOff.dayOff = !dayOff.dayOff;
      console.log({newDaysOff});
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

    // TODO: Remove this function and use daysOff2 directly
    const compressedDaysOff2 = convertDaysOff2(daysOff);

  return (
    <>
          <p>Dni w miesiącu: {daysCount}</p>

          <ChooseDaysOffForm employees={empsInGroup} daysOff={daysOff} handleDaysOff={handleDaysOff} />

          <GenerateButton2 daysOff2={compressedDaysOff2} />
    </>
  )
}

export default ChooseDaysOff



// function to convert this:
    // daysOff2:
  //   [
  //     {
  //         "id": "8-2023-04-01",
  //         "empId": 8,
  //         "date": "2023-04-01",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "11-2023-04-01",
  //         "empId": 11,
  //         "date": "2023-04-01",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "8-2023-04-02",
  //         "empId": 8,
  //         "date": "2023-04-02",
  //         "dayOff": true
  //     },
  //     {
  //         "id": "11-2023-04-02",
  //         "empId": 11,
  //         "date": "2023-04-02",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "8-2023-04-03",
  //         "empId": 8,
  //         "date": "2023-04-03",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "11-2023-04-03",
  //         "empId": 11,
  //         "date": "2023-04-03",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "8-2023-04-04",
  //         "empId": 8,
  //         "date": "2023-04-04",
  //         "dayOff": true
  //     },
  //     {
  //         "id": "11-2023-04-04",
  //         "empId": 11,
  //         "date": "2023-04-04",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "8-2023-04-05",
  //         "empId": 8,
  //         "date": "2023-04-05",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "11-2023-04-05",
  //         "empId": 11,
  //         "date": "2023-04-05",
  //         "dayOff": false
  //     },
  //     ...
  // ]

 // into this:
  //  mapEmpIdToFreeDays(empsInGroup, daysOff):
  //   {
  //     "8": [
  //         1,
  //         3
  //     ],
  //     "11": []
  // }

  function convertDaysOff2(daysOff2){
    const newDaysOff = {};
    daysOff2.forEach( ({empId, date, dayOff}) => {

      if(!newDaysOff[empId]) newDaysOff[empId] = [];
      
      if(dayOff) {
        // full date to day index
        // example: 2023-04-30 -> 29
        const dayIndex = new Date(date).getDate()-1;
        newDaysOff[empId].push(dayIndex);
      }

    })
    return newDaysOff;
  }