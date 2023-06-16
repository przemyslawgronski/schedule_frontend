import ShiftsTableCheck from "./ShiftsTableCheck"
import ChoosedDaysOff from "./newShift/ChoosedDaysOff";

const ChooseDaysOffForm = ({employees, daysOff, handleDaysOff}) => {

  const headers = employees.map(({id, first_name, last_name})=>({id, full_name: `${first_name} ${last_name}`}))

return (

    <>
        <p>Wybierz dni wolne:</p>

        <ShiftsTableCheck headers={headers} daysOff={daysOff} handleDaysOff={handleDaysOff}/>

        <ChoosedDaysOff daysOff={daysOff} employees={employees}/>
    </>
  )
}

export default ChooseDaysOffForm