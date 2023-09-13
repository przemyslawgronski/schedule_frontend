import React, { useContext } from 'react'
import { GroupIdContext } from './ChooseGroup'
import { SolutionContext } from './GetSolution'

const GenerateButton = ({daysOff, empIdToDaysOff}) => {

    const groupId = useContext(GroupIdContext);
    const {createSolution} = useContext(SolutionContext);

    const empIdToDaysOffObj = {};

    empIdToDaysOff.forEach((daysOff, empId)=>{
      // day to day index
      empIdToDaysOffObj[empId] = daysOff.map(day=>day-1);
    });

  return (
    <button onClick={()=>createSolution({
        checkedBoxes: empIdToDaysOffObj,
        num_days: daysOff.size,
        group_id: groupId,
      })
    }>Generuj</button>
  )
}

export default GenerateButton