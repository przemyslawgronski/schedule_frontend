import React, { useContext } from 'react'
import { DateContext } from './ChooseDate';
import { GroupIdContext } from './ChooseGroup';
import { SolutionContext } from './GetSolution';
import { SaveSuccessContext } from './SaveSuccess';

const SaveButton = () => {

    const {saveSolution} = useContext(SaveSuccessContext);
    const date = useContext(DateContext);
    const groupId = useContext(GroupIdContext);
    const {solution, resetSolution} = useContext(SolutionContext);

    if (!solution) return null;

  return (
    <button onClick={() => {
        saveSolution({
          month: date.month,
          year: date.year,
          group_id: groupId,
          solution: solution,
        });
        resetSolution(); // Reset generated schedule
      }}>Zapisz</button>
  )
}

export default SaveButton