import { unArr } from '../features/utils/arrayUtils'
import style from '../styles/tables.module.css'

const ShiftsTable = ({headers, shifts}) => {

  // TODO: Zrobić przycisk do przeglądania jak w excel online

  // TODO: Co gdy w jednym dniu będzie więcej niż jedna zmiana?

    return (
        <>
          <div className={style.responsivetable}>
            <table>
              <thead>
                <tr>
                    <th>Dzień</th>
                    {headers.map((emp)=>(<th key={emp.id}>{emp.full_name}</th>))}
                </tr>
              </thead>
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
            </table>
          </div>
      </>
      )
}
export default ShiftsTable