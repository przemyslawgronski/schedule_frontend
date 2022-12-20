import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const GroupData = ({group, groupEmployees, getGroupEmployees, getGroup}) => {

  useEffect(()=>{
    getGroup?.();
    getGroupEmployees?.();
  },[getGroup, getGroupEmployees])

  return (
    <div>
        <p>Nazwa: {group?.group_name}</p>
        <p>Liczba zmian: {group?.num_of_shifts}</p>
        <p>Ostatnia zmiana: {group?.updated}</p>
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

export default GroupData