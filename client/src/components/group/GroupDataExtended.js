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
            {groupEmployees?.map((employee, index) =>(
                <p key={index}>
                    <Link to={`/employees/${employee?.id}`}>
                        {employee?.id}, {employee?.first_name}, {employee?.last_name}
                    </Link>
                </p> ))}
        </ul>
    </div>
  )
}

export default GroupDataExtended