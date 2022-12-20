import { useEffect } from "react";

const EmployeeData = ({employee, groups, getEmp}) => {

  useEffect(()=>{
    getEmp?.(); // Refresh data
  },[getEmp])
  
  return (
    <div>
        <p>Imię: {employee?.first_name}</p>
        <p>Nazwisko: {employee?.last_name}</p>
        <p>grupy: {employee?.groups?.map?.((group_id)=>
            <span key={group_id}>{groups?.find(group=>group.id===group_id)?.group_name} </span>
        )}</p>
        <p>Ostatnia zmiana: {employee?.updated}</p>
    </div>
  )
}

export default EmployeeData