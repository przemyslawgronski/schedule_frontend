import { CheckBox } from "../form/Inputs"

const CheckDataRows = ({daysOff, handleDaysOff, headers}) => {

  const tableToRender = [];

  daysOff.forEach((empIdToDayOff, date)=>{
    tableToRender.push(
      <tr key={date}>
        <td>{date}</td>
        {
          headers.map(emp=>( // Keep order of headers
            <td key={emp.id}>
              <CheckBox
                isChecked={empIdToDayOff.get(emp.id)}
                changeFunc={()=>handleDaysOff(date, emp.id)}
              />
            </td>
          ))
        }
      </tr>
    )
  })

  return (
    <tbody>
      {tableToRender}
    </tbody>
  )
}

export default CheckDataRows