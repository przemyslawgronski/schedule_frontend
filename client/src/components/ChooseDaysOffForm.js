import { CheckBox } from "./form/Inputs"
import ShiftsTableCheck from "./ShiftsTableCheck"

const ChooseDaysOffForm = ({employees, daysOff, handleDaysOff}) => {

  const headers = employees.map(({id, first_name, last_name})=>({id, full_name: `${first_name} ${last_name}`}))

return (

    <>
        <p>Wybierz dni wolne:</p>

        <ShiftsTableCheck headers={headers} daysOff={daysOff} handleDaysOff={handleDaysOff}/>

        <p>Wybrane dni wolne:</p>

        {/* TODO: Wybrane dni wolne */}

        {/* {employees?.map((emp)=>
          <p key={emp.id}>
            {emp.first_name} {emp.last_name} : {chosenDaysOff[emp.id]?.map((dayIndex)=>
            <span key={dayIndex}>
              {dayIndex+1}
            </span>)}
          </p>)} */}
    </>
  )
}

export default ChooseDaysOffForm