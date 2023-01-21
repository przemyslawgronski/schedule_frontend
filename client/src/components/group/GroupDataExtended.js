import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GroupDataBasic from './GroupDataBasic'

const GroupDataExtended = ({group, groupEmployees, getGroupEmployees, getGroup}) => {

  useEffect(()=>{
    getGroup?.();
    getGroupEmployees?.();
  },[getGroup, getGroupEmployees])

  return (
    <div>
        <GroupDataBasic group={group}/>
        <p>Pracownicy przypisanin do grupy:</p>
        <ul>
            {groupEmployees?.map((employee) =>(
                <li key={employee.id}>
                    <Link to={`/employees/${employee.id}`}>
                        {employee.id}, {employee.first_name}, {employee.last_name}
                    </Link>
                </li> ))}
        </ul>
    </div>
  )
}

export default GroupDataExtended