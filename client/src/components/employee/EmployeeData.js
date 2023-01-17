import { useEffect } from "react";

const EmployeeData = ({employee, groups, getEmp, spanTag}) => {

  useEffect(()=>{
    getEmp?.(); // Refresh data
  },[getEmp])

  const empData = {
    'Imię': employee?.first_name,
    'Nazwisko': employee?.last_name,
    'Grupy': employee?.groups?.map?.((group_id)=>
        <span key={group_id}>{groups?.find(group=>group.id===group_id)?.group_name} </span>
    ),
    'Ostatnia zmiana': employee?.updated
    }
  
  return (
    <div>
      {Object.keys(empData).map((key)=>(
        spanTag ? <span key={key}>&nbsp;{empData[key]}&nbsp;</span> : <p key={key}>{key} {empData[key]}</p>
      ))}
    </div>
  )
}

export default EmployeeData