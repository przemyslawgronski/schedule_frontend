import { unArr } from '../features/utils/arrayUtils'
import { convertShifts } from '../features/utils/arrayUtils'

const TbodyShifts = ({shifts, headers}) => {

  // return new Map in format: { date => {employee => shift_num, ...}, ... }
  // eg.: '2023-09-01' => Map{ 8 => [ 1 ], 12 => [ 0 ] }
  const convertedShifts = convertShifts(shifts);

  const tableToRender = [];

  convertedShifts.forEach((empsToShifts, date) => {
    tableToRender.push(
      // eg.: <tr><td>2023-09-10</td><td>0</td><td>1</td></tr>
      <tr key={date}>
        <td key='date'>{date}</td>
        { // Keep order of headers (employees)
        headers.map((emp) => <td key={emp.id}>{unArr(empsToShifts.get(emp.id))}</td>)}
      </tr>
    )
  })

  return (
    <tbody>
      {tableToRender}
    </tbody>
  )
}
export default TbodyShifts