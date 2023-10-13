import React, {useEffect, useContext, useState} from 'react'
import ChooseDaysOffForm from '../ChooseDaysOffForm'
import { EmpsInGroupContext } from './EmpsInGroup'
import { DateContext } from './ChooseDate'
import { SolutionContext } from './GetSolution'
import GenerateButton from './GenerateButton'
import toggleDayOff from '../../features/pageSpecific/toggleDayOff'
import empIdToDaysOff from '../../features/pageSpecific/empIdToDaysOff'
import newDaysOff from '../../features/pageSpecific/newDaysOff'

const ChooseDaysOff = () => {

    const empsInGroup = useContext(EmpsInGroupContext);
    const date = useContext(DateContext);
    const {resetSolution} = useContext(SolutionContext);

    const [daysOff, setDaysOff] = useState([]);

    useEffect(() => resetSolution(),[resetSolution, daysOff]); // Reset solution if daysOff changed

    // Set daysOff to new Map if empsInGroup or date changed    
    useEffect(() => setDaysOff(newDaysOff(empsInGroup, date)) ,[empsInGroup, date]);

    if(daysOff.length===0) return null;

    const handleDaysOff = (date, empId) => toggleDayOff(date, empId, setDaysOff);

    const empIdToDaysOffData = empIdToDaysOff(daysOff);

  return (
    <>
          <p>Dni w miesiącu: {daysOff.size}</p>

          <ChooseDaysOffForm
            employees={empsInGroup}
            daysOff={daysOff}
            handleDaysOff={handleDaysOff}
            empIdToDaysOff={empIdToDaysOffData}
            />

          <GenerateButton daysOff={daysOff} empIdToDaysOff={empIdToDaysOffData}/>
    </>
  )
}

export default ChooseDaysOff