import { unArr } from '../features/utils/arrayUtils'

const TbodyShifts = ({shifts, headers}) => {

  console.log({shifts, headers})
  // TODO: Important! - this is not working properly
  // Warning: Encountered two children with the same key, `2023-08-01`.
  // Keys should be unique so that components maintain their identity across updates.
  // Non-unique keys may cause children to be duplicated and/or omitted
  // — the behavior is unsupported and could change in a future version.

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