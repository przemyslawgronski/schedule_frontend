import { CheckBox } from "../form/Inputs"
import { groupDaysOffByDate } from "../../features/pageSpecific/checkDataRowsFunc"

const CheckDataRows = ({daysOff, handleDaysOff, headers}) => {

  const daysOffByDate = groupDaysOffByDate(daysOff);

  return (
    <tbody>
    {
      Object.keys(daysOffByDate).map(day=>(
        <tr key={day}>
          <td>{day}</td>
          {
            headers.map(emp=>(
              <td key={emp.id}>
                <CheckBox
                  isChecked={daysOffByDate[day][emp.id].dayOff}
                  changeFunc={()=>handleDaysOff(daysOffByDate[day][emp.id].id)}
                />
              </td>
            ))
          }
        </tr>
      ))
    }

    </tbody>
  )
}

export default CheckDataRows