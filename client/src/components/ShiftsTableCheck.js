import style from '../styles/tables.module.css'
import CheckDataRows from './newShift/CheckDataRows'

const ShiftsTableCheck = ({headers, daysOff, handleDaysOff}) => {

  // TODO: Zrobić przycisk do przeglądania jak w excel online

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
              <CheckDataRows daysOff={daysOff} handleDaysOff={handleDaysOff} headers={headers}/>
            </table>
          </div>
      </>
      )
}
export default ShiftsTableCheck