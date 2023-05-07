import style from '../styles/tables.module.css'

const ShiftsTable = ({emps, shifts}) => {

    const headers = emps.map(({id, first_name, last_name})=>({id:id, full_name:`${first_name} ${last_name}`}) );

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