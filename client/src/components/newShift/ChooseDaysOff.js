import React, {useEffect, useContext, useState, createContext} from 'react'
import ChooseDaysOffForm from '../ChooseDaysOffForm'
import { dateUtils } from '../../features/utils/dateUtils'
import { safeInvertAtPos } from '../../features/utils/objUtils'
import { create2dArr } from '../../features/utils/arrayUtils'
import { mapEmpIdToFreeDays } from '../../features/pageSpecific/newShiftsFunc'
import { EmpsInGroupContext } from './EmpsInGroup'
import { GroupIdContext } from './ChooseGroup'
import { DateContext } from './ChooseDate'
import GenerateButton2 from './GenerateButton2'

export const DaysOffContext = createContext();

const ChooseDaysOff = ({children}) => {

    const empsInGroup = useContext(EmpsInGroupContext);
    const groupId = useContext(GroupIdContext);
    const date = useContext(DateContext);

    const [daysOff, setDaysOff] = useState([]);
    const [daysOff2, setDaysOff2] = useState([]);

    const handleDaysOff = (pos1, pos2) => setDaysOff( prev=> safeInvertAtPos(prev, [pos1, pos2]) );
    const handleDaysOff2 = (dayOffId)=>setDaysOff2( prev=> {
      const newDaysOff = JSON.parse(JSON.stringify(prev));
      const dayOff = newDaysOff.find( ({id})=>id===dayOffId );
      dayOff.dayOff = !dayOff.dayOff;
      console.log({newDaysOff});
      return newDaysOff;
    });
    const daysCount = dateUtils.daysInMonth(date.year, date.month);

    useEffect(()=>{
        // Create new empty array
        setDaysOff(create2dArr(daysCount, empsInGroup.length, false));
    },[daysCount, empsInGroup.length, groupId, date, setDaysOff])

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

      setDaysOff2(newDaysOff);
    
    },[empsInGroup, date])

    console.log({daysOff2, daysOff});



    const compressedDaysOff2 = convertDaysOff2(daysOff2);

    console.log({compressedDaysOff2});

  return (
    <>
          <p>Dni w miesiącu: {daysCount}</p>

          <ChooseDaysOffForm employees={empsInGroup} daysOff={daysOff} daysOff2={daysOff2}
          handleDaysOff={handleDaysOff} handleDaysOff2={handleDaysOff2} chosenDaysOff={mapEmpIdToFreeDays(empsInGroup, daysOff)} />

          <DaysOffContext.Provider value={daysOff}>
              {children}
          </DaysOffContext.Provider>

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