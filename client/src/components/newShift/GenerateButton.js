import React, { useContext } from 'react'
import { GroupIdContext } from './ChooseGroup'
import { EmpsInGroupContext } from './EmpsInGroup'
import { DateContext } from './ChooseDate'
import { mapEmpIdToFreeDays } from '../../features/pageSpecific/newShiftsFunc'
import { dateUtils } from '../../features/utils/dateUtils'
import { SolutionContext } from './GetSolution'
import { DaysOffContext } from './ChooseDaysOff'

// TODO: Remove this component

const GenerateButton = () => {

    const groupId = useContext(GroupIdContext);
    const empsInGroup = useContext(EmpsInGroupContext);
    const date = useContext(DateContext);
    const {createSolution} = useContext(SolutionContext);
    const daysOff = useContext(DaysOffContext);

    console.log('------- > mapEmpIdToFreeDays(empsInGroup, daysOff) -------')
    console.log(mapEmpIdToFreeDays(empsInGroup, daysOff))
    console.log('------- < mapEmpIdToFreeDays(empsInGroup, daysOff) -------')

  return (
    <button onClick={()=>createSolution({
        checkedBoxes: mapEmpIdToFreeDays(empsInGroup, daysOff),
        num_days: dateUtils.daysInMonth(date.year, date.month),
        group_id: groupId,
      })}>Generuj</button>
  )
}

export default GenerateButton