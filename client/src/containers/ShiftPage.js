import { useParams } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import shiftMangle from '../features/pageSpecific/shiftMangle';
import Tables from '../components/Tables';

const ShiftPage = () => {

  const { year, month } = useParams();
  const [{data:shifts, error:shiftsErr}] = useGetAndChange({url: `/api/schedule/shifts/${year}/${month}`});

  const [mangledShifts, empsInGroup] = shiftMangle(shifts);

  if (shiftsErr) return <ErrorList errors={[shiftsErr.message]} />

  // mangledShifts
  // {"1": {"2024-12-31": {"1": [0]},"2024-12-30": {"2": [0]}, ...

  // empsInGroup
  // {"1": [1, 2]}

  const removedEmpName = "Pracownicy usunięci";

  const cellsGen = (grID, day, emp)=>{
    if (emp === 'Dzień') return day
    if (emp === removedEmpName) return mangledShifts[grID][day][null]
    return mangledShifts[grID][day][emp]
  }

  return (
    <div>ShiftPage {year} / {month} /
      <div>
        <Tables
          tables={Object.keys(mangledShifts)} // array of table keys
          captions={(grID)=>grID !== 'null' ? grID : "Grupa usunięta"} // caption for a given table key
          // array of headers for a given table key
          headers={(grID)=>['Dzień', ...(empsInGroup[grID].map((emp)=>emp ? emp : removedEmpName))]}
          rows={(grID)=>Object.keys(mangledShifts[grID])} // array of row keys for a given table key
          cells={cellsGen} // cell value for a given table key, row key and column key
        />
      </div>
    </div>
  )    
}

export default ShiftPage