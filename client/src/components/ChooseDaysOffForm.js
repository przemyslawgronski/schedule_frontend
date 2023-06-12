import { CheckBox } from "./form/Inputs"
import ShiftsTableCheck from "./ShiftsTableCheck"


// TODO: Pokazać w ładnej tabeli (może ShiftsTable?) wybrane dni wolne

const ChooseDaysOffForm = ({employees, daysOff, handleDaysOff, handleDaysOff2, chosenDaysOff, daysOff2}) => {

  // console.log(employees);
  // console.log(daysOff);

  const headers = employees.map(({id, first_name, last_name})=>({id, full_name: `${first_name} ${last_name}`}))
  // console.log(headers);

return (

    <>
        <p>Wybierz dni wolne:</p>

        <ShiftsTableCheck headers={headers} daysOff2={daysOff2} handleDaysOff2={handleDaysOff2}/>

        {employees?.map((emp)=>(<span key={emp.id}>{emp.first_name} {emp.last_name} </span>))}

        {daysOff?.map((isCheckedByDay, dayIndex)=>(
            <div key={dayIndex}>
              {dayIndex+1}
              {isCheckedByDay?.map( (isCheckedByShift, shiftIndex)=> (
              
              <CheckBox
                key={shiftIndex}
                isChecked={isCheckedByShift}
                changeFunc={()=>handleDaysOff(dayIndex, shiftIndex)}
              />
              
              ) )}
            </div>
        )
        )}

        <p>Wybrane dni wolne:</p>

        {employees?.map((emp)=>
          <p key={emp.id}>
            {emp.first_name} {emp.last_name} : {chosenDaysOff[emp.id]?.map((dayIndex)=>
            <span key={dayIndex}>
              {dayIndex+1}
            </span>)}
          </p>)}
    </>
  )
}

export default ChooseDaysOffForm