import { useParams } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import shiftMangle from '../features/pageSpecific/shiftMangle';
import Tables from '../components/Tables';
import RemoveButton from '../components/form/RemoveButton';
import { dateUtils } from '../features/utils/dateUtils';

const ShiftPage = () => {

  const { id, year, month } = useParams();
  const [{data:shifts, error:shiftsErr}] = useGetAndChange({url: `/api/schedule/shifts/${id}/${year}/${month}`});
  const [ group ] = useGetAndChange({url:`/api/schedule/groups/${id}`});

  const errors = [group.error, shiftsErr].filter(Boolean);
  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  const [mangledShifts, empsInGroup] = shiftMangle(shifts);

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

  const groupIdToName = (grId) => {
    grId = parseInt(grId);
    console.log(group?.data?.group_name);
    return "elo"
  };

  return (
    <div>
    <h1>Zmiany: {dateUtils.monthName(month-1)} {year}</h1>
        <Tables
          tables={Object.keys(mangledShifts)} // array of table keys
          captions={(grID)=>grID !== 'null' ? groupIdToName(grID) : "Grupa usunięta"} // caption for a given table key
          // array of headers for a given table key
          headers={(grID)=>['Dzień', ...(empsInGroup[grID].map((emp)=>emp ? emp : removedEmpName))]}
          rows={(grID)=>Object.keys(mangledShifts[grID])} // array of row keys for a given table key
          cells={cellsGen} // cell value for a given table key, row key and column key
        />
        <RemoveButton
          name={`Zmiany z ${month}.${year}`}
          url={`/api/schedule/shifts/${id}/${year}/${month}`}
          after_url={`/shifts`}
          msg = "Ostrożnie! Zostaną usunięte wszystkie zmiany z tej grupy z tego miesiąca."
        />
    </div>
  )    
}

export default ShiftPage