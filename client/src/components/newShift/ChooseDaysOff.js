import React, {useEffect, useContext, useState, createContext} from 'react'
import ChooseDaysOffForm from '../ChooseDaysOffForm'
import { dateUtils } from '../../features/utils/dateUtils'
import { safeInvertAtPos } from '../../features/utils/objUtils'
import { create2dArr } from '../../features/utils/arrayUtils'
import { mapEmpIdToFreeDays } from '../../features/pageSpecific/newShiftsFunc'
import { EmpsInGroupContext } from './EmpsInGroup'
import { GroupIdContext } from './ChooseGroup'
import { DateContext } from './ChooseDate'

export const DaysOffContext = createContext();

const ChooseDaysOff = ({children}) => {

    const empsInGroup = useContext(EmpsInGroupContext);
    const groupId = useContext(GroupIdContext);
    const date = useContext(DateContext);

    const [daysOff, setDaysOff] = useState([]);

    const handleDaysOff = (pos1, pos2) => setDaysOff( prev=> safeInvertAtPos(prev, [pos1, pos2]) );
    const daysCount = dateUtils.daysInMonth(date.year, date.month);

    useEffect(()=>{
        // Create new empty array
        setDaysOff(create2dArr(daysCount, empsInGroup.length, false));
    },[daysCount, empsInGroup.length, groupId, date, setDaysOff])

  return (
    <>
          <p>Dni w miesiącu: {daysCount}</p>

          <ChooseDaysOffForm employees={empsInGroup} daysOff={daysOff}
          handleDaysOff={handleDaysOff} chosenDaysOff={mapEmpIdToFreeDays(empsInGroup, daysOff)} />

          <DaysOffContext.Provider value={daysOff}>
              {children}
          </DaysOffContext.Provider>
    </>
  )
}

export default ChooseDaysOff