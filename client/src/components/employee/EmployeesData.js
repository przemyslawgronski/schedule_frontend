import { Link } from "react-router-dom"
import EmployeeData from "./EmployeeData"

const EmployeesData = ({employees, groups, removeInfo}) => {
    if (employees.length === 0) return <p>Brak pracowników</p>;

  return (
    <ul>
        {employees.map(employee =>(
            <li key={employee.id}>
                <EmployeeData employee={employee} groups={groups} spanTag={true} removeInfo={removeInfo}/>
                <Link to={`/employees/${employee.id}`}>Więcej</Link>
            </li>
        ))}
    </ul>
  );
}
export default EmployeesData