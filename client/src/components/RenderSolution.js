import { useContext } from 'react';
import { SolutionContext } from './newShift/GetSolution';
import { EmpsInGroupContext } from './newShift/EmpsInGroup';
import { DateContext } from './newShift/ChooseDate';
import ShiftsTable from './ShiftsTable';

const RenderSolution = () => {

  const employees = useContext(EmpsInGroupContext);
  const { solution } = useContext(SolutionContext);
  const { year, month } = useContext(DateContext);

  if (!solution) return null;
  
  const headers = employees.map(({id, first_name, last_name})=>({id:id, full_name:`${first_name} ${last_name}`}) );

  // solution example:
  //{"0": {"11": [0]}, "1": {"8": [0]}, "2": {"8": [0]}, ...}
  //{ day index: { emp id: [shift index] } }

  const shifts = [];

  Object.keys(solution).forEach((dayIndex)=>{
    const date = `${year}-${month.toString().padStart(2,'0')}-${(parseInt(dayIndex)+1).toString().padStart(2,'0')}`
    
    Object.keys(solution[dayIndex]).forEach((empID)=>{
      shifts.push({date:date, employee:parseInt(empID), shift_num: solution[dayIndex][empID]});
    });
  });

  return <ShiftsTable headers={headers} shifts={shifts} />;
}

export default RenderSolution