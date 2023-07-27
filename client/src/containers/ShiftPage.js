import { useParams } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList/ErrorList';
import RemoveButton from '../components/form/RemoveButton';
import { dateUtils } from '../features/utils/dateUtils';
import ShiftsTable from '../components/ShiftsTable/ShiftsTable';
import { genHeaders } from '../features/pageSpecific/shiftPageFunc';
import TbodyShifts from '../components/TbodyShifts';

const ShiftPage = () => {

  const { id, year, month } = useParams();
  const [{data:shifts, error:shiftsErr}] = useGetAndChange({url: `/api/schedule/shifts/${id}/${year}/${month}`});
  const [{data:group, error:groupErr}] = useGetAndChange({url:`/api/schedule/groups/${id}`});
  const [{data:allEmps, error:allEmpsErr}] = useGetAndChange({url: "/api/schedule/employees"})

  const errors = [groupErr, allEmpsErr, shiftsErr].filter(Boolean);
  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  if(!shifts || !group || !allEmps) return (<div>Ładowanie...</div>);

  const headers = genHeaders(shifts, allEmps);

  return (
    <div>
      <h1>Zmiany: {dateUtils.monthName(month-1)} {year}</h1>
      <h2>Grupa: {group.group_name}</h2>
          
          <ShiftsTable headers={headers}>
            <TbodyShifts shifts={shifts} headers={headers}/>
          </ShiftsTable>

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