import DisplayObject from "../DisplayObject";

const EmployeeData = ({employee, groups, spanTag, removeInfo}) => {

  if(employee === null) return <p>Czekam na dane...</p>;

  const empData = {
    'Imię': employee?.first_name,
    'Nazwisko': employee?.last_name,
    'Grupy': employee?.groups?.map?.((group_id)=>
        <span key={group_id}>{groups?.find(group=>group.id===group_id)?.group_name} </span>
    ),
    'Ostatnia zmiana': employee?.updated,
    'Ukryty': employee?.hide ? 'Tak' : 'Nie',
    }

    if(removeInfo && Array.isArray(removeInfo) && removeInfo.length > 0){
      removeInfo.forEach((key)=>delete empData[key]);
    }

  return (
    <DisplayObject object={empData} spanTag={spanTag}/>
  )
}

export default EmployeeData