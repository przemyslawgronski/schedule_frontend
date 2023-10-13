import { CheckBox } from "../form/Inputs"

const CheckDataRows = ({daysOff, handleDaysOff, headers}) => {

  return (
    <tbody>
      {
        Array.from(daysOff, ([date, empIdToDayOff]) => { return (
          <tr key={date}>
            <td>{date}</td>
            {
              headers.map(emp => ( // Keep order of headers
                <td key={emp.id}>
                  <CheckBox
                    isChecked={empIdToDayOff.get(emp.id)}
                    changeFunc={()=>handleDaysOff(date, emp.id)}
                  />
                </td>
              ))
            }
          </tr>
        )})
      }
    </tbody>
  )
}

export default CheckDataRows