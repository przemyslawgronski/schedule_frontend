import React, { useContext } from 'react'
import { GroupIdContext } from './ChooseGroup'
import { DateContext } from './ChooseDate'
import { SolutionContext } from './GetSolution'
import { convertDaysOff } from '../../features/pageSpecific/generateButtonFunc'

const GenerateButton = ({daysOff}) => {

    const groupId = useContext(GroupIdContext);
    const date = useContext(DateContext);
    const {createSolution} = useContext(SolutionContext);

  return (
    <button onClick={
      ()=>createSolution({
        checkedBoxes: convertDaysOff(daysOff),
        num_days: new Set(daysOff.map( ({date}) => date)).size,
        group_id: groupId,
      })
    }>Generuj</button>
  )
}

export default GenerateButton