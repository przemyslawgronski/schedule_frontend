import { useParams } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import RemoveButton from '../components/form/RemoveButton';
import { dateUtils } from '../features/utils/dateUtils';
import ShiftsTable from '../components/ShiftsTable';

const ShiftPage = () => {

  const { id, year, month } = useParams();
  const [{data:shifts, error:shiftsErr}] = useGetAndChange({url: `/api/schedule/shifts/${id}/${year}/${month}`});
  const [ group ] = useGetAndChange({url:`/api/schedule/groups/${id}`});
  const [ allEmps ] = useGetAndChange({url: "/api/schedule/employees"})

  const errors = [group.error, allEmps.error, shiftsErr].filter(Boolean);
  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  if(!shifts || !group || !allEmps) return (<div>Ładowanie...</div>);

  // unique employee ids from shifts:
  const uniqueEmpsIds = [...new Set(shifts?.map(shift => shift.employee))];
  
  // unique employees from ids
  const uniqueEmps = uniqueEmpsIds?.map((empID)=>allEmps?.data?.find((emp)=>emp.id === empID));

  return (
    <div>
    <h1>Zmiany: {dateUtils.monthName(month-1)} {year}</h1>
    <h2>Grupa: {group?.data?.group_name}</h2>
        
        { uniqueEmps.filter(Boolean).length && <ShiftsTable emps={uniqueEmps} shifts={shifts}/>}

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