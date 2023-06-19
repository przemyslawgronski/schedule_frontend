import ChoosedDaysOff from "./newShift/ChoosedDaysOff";
import CheckDataRows from './newShift/CheckDataRows';
import ShiftsTable from "./ShiftsTable";

const ChooseDaysOffForm = ({employees, daysOff, handleDaysOff}) => {

  const headers = employees.map(({id, first_name, last_name})=>({id, full_name: `${first_name} ${last_name}`}))

return (

    <>
        <p>Wybierz dni wolne:</p>

        <ShiftsTable headers={headers}>
          <CheckDataRows daysOff={daysOff} handleDaysOff={handleDaysOff} headers={headers}/>
        </ShiftsTable>

        <ChoosedDaysOff daysOff={daysOff} employees={employees}/>
    </>
  )
}

export default ChooseDaysOffForm