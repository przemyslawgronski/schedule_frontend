import { Link } from "react-router-dom"

const LinkEmployees = ({employees}) => (
    <>
        {Array.isArray(employees) && employees.map((employee) =>(
        <p key={employee.id}>
            <Link to={`/employees/${employee.id}`}>{employee.id}, {employee.first_name}, {employee.last_name}</Link>
        </p> 
        ))}
    </>
  )

export default LinkEmployees