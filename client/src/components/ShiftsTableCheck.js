import style from '../styles/tables.module.css'
import CheckDataRows from './newShift/CheckDataRows'

const ShiftsTableCheck = ({headers, daysOff2, handleDaysOff2}) => {

  // TODO: Zrobić przycisk do przeglądania jak w excel online



  console.log({daysOff2});

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
              <CheckDataRows daysOff2={daysOff2} handleDaysOff2={handleDaysOff2} headers={headers}/>
              {/* {shifts.map((shift)=>(
                // Each row (date) must be unique
                <tr key={shift.date}>
                    <td>{shift.date}</td>
                    {headers.map((emp)=>(
                        <td key={emp.id}>{emp.id===shift.employee && unArr(shift.shift_num)}</td>
                    ))}
                </tr>
              ) )} */}
            </table>
          </div>
      </>
      )
}
export default ShiftsTableCheck