import style from '../styles/tables.module.css'

const ShiftsTableCheck = ({headers, children}) => {

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
              {children}
            </table>
          </div>
      </>
      )
}
export default ShiftsTableCheck