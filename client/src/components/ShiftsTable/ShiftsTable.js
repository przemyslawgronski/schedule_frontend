import style from './tables.module.css'

const ShiftsTable = ({headers, children}) => {

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
              {children}
            </table>
          </div>
      </>
      )
}
export default ShiftsTable