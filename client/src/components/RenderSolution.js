import React, { useContext } from 'react'
import { SolutionContext } from './newShift/GetSolution'
import { EmpsInGroupContext } from './newShift/EmpsInGroup';

const RenderSolution = () => {

  const employees = useContext(EmpsInGroupContext);
  const { solution } = useContext(SolutionContext);

  if (!solution) return null;
  
  return (
    <>
        {Object.keys(solution).map((dayIndex)=>
          <p key={dayIndex}>
          {parseInt(dayIndex)+1} : 
          {employees.map((emp)=>
              <span key={emp.id}>
              | {emp.id}:{solution[dayIndex][emp.id] ?? "X"} |
              </span>
          )}
          </p>
        )}

    </>
  )}

export default RenderSolution