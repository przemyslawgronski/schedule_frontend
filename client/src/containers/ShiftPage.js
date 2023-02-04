import { useParams } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import shiftMangle from '../features/pageSpecific/shiftMangle';

const ShiftPage = () => {

  const { year, month } = useParams();
  const [{data:shifts, error:shiftsErr}] = useGetAndChange({url: `/api/schedule/shifts/${year}/${month}`});

  const [mangledShifts, empsInGroup] = shiftMangle(shifts);

  if (shiftsErr) return <ErrorList errors={[shiftsErr.message]} />

  // mangledShifts
  // {"1": {"2024-12-31": {"1": [0]},"2024-12-30": {"2": [0]}, ...

  // empsInGroup
  // {"1": [1, 2]}

  return (
    <div>ShiftPage {year} / {month} /

      { Object.keys(mangledShifts).map((grID)=>(
        <div key={grID}>
          {grID} :
          {Object.keys(mangledShifts[grID]).map( (day)=>(
            <p key={day}>
              {day}
              {empsInGroup[grID].map((emp)=>(
                <span key={emp}>
                  , {emp}:{mangledShifts[grID][day][emp] ?? "X"} ,
                </span>))}
            </p>
          ) )}
        </div>
      ))}
    </div>
  )    
}

export default ShiftPage