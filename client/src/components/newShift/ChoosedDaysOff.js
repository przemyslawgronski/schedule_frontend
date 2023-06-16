const ChoosedDaysOff = ({daysOff, employees}) => {

const choosedDaysOff = daysOff.filter(({dayOff}) => dayOff)

const empsToDaysOff = new Map()

choosedDaysOff.forEach(dayOff => {
  const emp = employees.find(emp => emp.id === dayOff.empId);

  if (empsToDaysOff.has(emp)) empsToDaysOff.get(emp).push(dayOff.date);
  else empsToDaysOff.set(emp, [dayOff.date]);
});

  return (
    <div>
      <p>Wybrane dni wolne:</p>
      
      {[...empsToDaysOff].map(([emp, daysOff]) => (
          <p key={emp.id}>
            {emp.first_name} {emp.last_name} : {daysOff.map((dayOff, index) => (
              <span key={dayOff}>
                {new Date(dayOff).getDate()}
                {index < daysOff.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        ))
      }
    </div>
  )
}
export default ChoosedDaysOff