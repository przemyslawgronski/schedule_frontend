import React, {useEffect} from 'react'
import ChooseDaysOff from '../ChooseDaysOff'
import { dateUtils } from '../../features/utils/dateUtils'
import { safeInvertAtPos } from '../../features/utils/objUtils'
import { create2dArr } from '../../features/utils/arrayUtils'
import { mapEmpIdToFreeDays } from '../../features/pageSpecific/newShiftsFunc'


const FormWithEmps = ({empsInGroup, date, groupId, setDaysOff, daysOff}) => {

    const handleDaysOff = (pos1, pos2) => setDaysOff( prev=> safeInvertAtPos(prev, [pos1, pos2]) );
    const daysCount = dateUtils.daysInMonth(date.year, date.month);

    useEffect(()=>{
        // Create new empty array
        setDaysOff(create2dArr(daysCount, empsInGroup?.length, false));
    },[daysCount, empsInGroup?.length, groupId, date, setDaysOff])

  return (
    <>
          <p>Dni w miesiącu: {daysCount}</p>

          <ChooseDaysOff employees={empsInGroup} daysOff={daysOff}
          handleDaysOff={handleDaysOff} chosenDaysOff={mapEmpIdToFreeDays(empsInGroup, daysOff)} />
    </>
  )
}

export default FormWithEmps