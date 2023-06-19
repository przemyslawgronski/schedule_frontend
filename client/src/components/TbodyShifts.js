import { unArr } from '../features/utils/arrayUtils'

const TbodyShifts = ({shifts, headers}) => {
  return (
    <tbody>
        {shifts.map((shift)=>(
        // Each row (date) must be unique
        <tr key={shift.date}>
            <td>{shift.date}</td>
            {headers.map((emp)=>(
                <td key={emp.id}>{emp.id===shift.employee && unArr(shift.shift_num)}</td>
            ))}
        </tr>
        ) )}
    </tbody>
  )
}
export default TbodyShifts