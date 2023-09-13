const ChoosedDaysOff = ({employees, empIdToDaysOff}) => {

const renderEmpIdToDaysOff = []

empIdToDaysOff.forEach((daysOff, empId) => {
  const emp = employees.find(emp => emp.id === empId);
  
  renderEmpIdToDaysOff.push(
    <p key={empId}>
      {emp.first_name} {emp.last_name} : {daysOff.map((dayOff, index) => (
        <span key={dayOff}> {dayOff} {index < daysOff.length - 1 ? ', ' : ''} </span>
      ))}
    </p>
  )
});

  return (
    <div>
      <p>Wybrane dni wolne:</p>
      {renderEmpIdToDaysOff}
    </div>
  )
}

export default ChoosedDaysOff