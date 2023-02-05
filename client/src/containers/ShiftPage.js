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
  //  emp === 'Dzień' ? day : 
  //mangledShifts[grID][day][emp]?.map((shift)=><span key={shift}> {shift} </span>) ?? mangledShifts[grID][day][emp]
  if (emp === 'Dzień') return day
  if (emp === removedEmpName) return mangledShifts[grID][day][null]
  console.log({grID, day, emp})

  console.log(mangledShifts[grID][day][emp])
  return "Elo"
  }

  return (
    <div>ShiftPage {year} / {month} /

      { Object.keys(mangledShifts).map((grID)=>(
        <table key={grID}>
          <caption>Grupa {grID !== 'null' ? grID : "usunięta"}</caption>
          <thead>
            <tr>
              <th key='day'>Dzień</th>
              {empsInGroup[grID].map((emp)=>(
                <th key={emp}>{emp ? emp : "Pracownicy usunięci"}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {Object.keys(mangledShifts[grID]).map( (day)=>(
            <tr key={day}>
              <td>{day}</td>
              {empsInGroup[grID].map((emp)=>(
                <>
                {console.log({grID, day, emp})}
                <td key={emp}>{mangledShifts[grID][day][emp]?.map((shift)=><span key={shift}> {shift} </span>) ?? "X"}</td>
                </>
              ))}
            </tr>
          ) )}
          </tbody>
        </table>
      ))}
      <div>
        <Tables
          tables={Object.keys(mangledShifts)}
          captions={(grID)=>grID !== 'null' ? grID : "Grupa usunięta"}
          headers={(grID)=>['Dzień', ...(empsInGroup[grID].map((emp)=>emp ? emp : removedEmpName))]}
          rows={(grID)=>Object.keys(mangledShifts[grID])} // asd
          cells={cellsGen}
            //'grid:'+grID+' day:' + day + 'emp' + emp}//mangledShifts[grID][day][emp] ?? "X"}
        />
      </div>
    </div>
  )    
}

export default ShiftPage