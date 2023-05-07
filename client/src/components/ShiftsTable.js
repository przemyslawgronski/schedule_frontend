import style from '../styles/tables.module.css'

const ShiftsTable = ({headers, shifts}) => {

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
                <tr key={shift.id}>
                    <td>{shift.date}</td>
                    {headers.map((emp)=>(
                        <td key={emp.id}>{emp.id===shift.employee && shift.shift_num}</td>
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