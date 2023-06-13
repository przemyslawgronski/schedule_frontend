import React, { useContext } from 'react'
import { GroupIdContext } from './ChooseGroup'
import { DateContext } from './ChooseDate'
import { dateUtils } from '../../features/utils/dateUtils'
import { SolutionContext } from './GetSolution'

const GenerateButton2 = ({daysOff2}) => {

    const groupId = useContext(GroupIdContext);
    const date = useContext(DateContext);
    const {createSolution} = useContext(SolutionContext);

  return (
    <button onClick={()=>createSolution({
        checkedBoxes: daysOff2,
        num_days: dateUtils.daysInMonth(date.year, date.month),
        group_id: groupId,
      })}>Generuj2</button>
  )
}

export default GenerateButton2