import React, { useContext } from 'react'
import { SolutionContext } from './newShift/GetSolution'
import { SaveSuccessContext } from './newShift/SaveSuccess';
import { DateContext } from './newShift/ChooseDate';
import { GroupIdContext } from './newShift/ChooseGroup';
import { EmpsInGroupContext } from './newShift/EmpsInGroup';

const RenderSolution = () => {

  const employees = useContext(EmpsInGroupContext);
  const {solution, resetSolution} = useContext(SolutionContext);
  const {saveSolution} = useContext(SaveSuccessContext);
  const date = useContext(DateContext)
  const groupId = useContext(GroupIdContext)

  if(!solution) return null;
  
  return (
    <>
        {Object.keys(solution)?.map((dayIndex)=>
          <p key={dayIndex}>
          {parseInt(dayIndex)+1} : 
          {employees?.map((emp)=>
              <span key={emp.id}>
              | {emp.id}:{solution[dayIndex][emp.id] ?? "X"} |
              </span>
          )}
          </p>
        )}
        {solution && <button onClick={() => {
            saveSolution({
              month: date.month,
              year: date.year,
              group_id: groupId,
              solution: solution,
            });
            resetSolution(); // Reset generated schedule
          }}>Zapisz</button>}
    </>
  )}

export default RenderSolution