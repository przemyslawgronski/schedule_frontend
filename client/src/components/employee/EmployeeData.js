import DisplayObject from "../DisplayObject";

const EmployeeData = ({employee, groups, spanTag, removeInfo}) => {

  const empData = {
    'Imię:': employee?.first_name || 'Ładowanie...',
    'Nazwisko:': employee?.last_name || 'Ładowanie...',
    'Grupy:': employee?.groups?.map?.((group_id)=>
        <span key={group_id}>{groups?.find(group=>group.id===group_id)?.group_name} </span>
    ) || 'Ładowanie...',
    'Ostatnia zmiana:': employee?.updated || 'Ładowanie...',
    'Ukryty:': employee?.hide === undefined ? 'Ładowanie...' : employee.hide ? 'Tak' : 'Nie',
    }

    if(removeInfo && Array.isArray(removeInfo) && removeInfo.length > 0){
      removeInfo.forEach((key)=>delete empData[key]);
    }

  return (
    <DisplayObject object={empData} spanTag={spanTag}/>
  )
}

export default EmployeeData