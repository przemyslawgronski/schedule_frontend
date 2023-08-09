import style from './tables.module.css'

const ShiftsTable = ({headers, children}) => {
  return (
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
  )
}
export default ShiftsTable