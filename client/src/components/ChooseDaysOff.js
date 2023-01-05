import CheckBox from "./form/CheckBox"

const ChooseDaysOff = ({employees, daysOff, handleDaysOff, chosenDaysOff}) => (
    <>
        <p>Wybierz dni wolne:</p>

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

export default ChooseDaysOff