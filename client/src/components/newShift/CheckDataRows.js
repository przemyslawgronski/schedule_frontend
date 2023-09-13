import { CheckBox } from "../form/Inputs"
import { groupDaysOffByDate } from "../../features/pageSpecific/checkDataRowsFunc"

const CheckDataRows = ({daysOff, handleDaysOff, headers}) => {

  const daysOffByDate = groupDaysOffByDate(daysOff);

  const tableToRender = [];

  daysOffByDate.forEach((empIdToDayOff, date)=>{
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