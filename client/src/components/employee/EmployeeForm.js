import React from "react";

const EmployeeForm = ({employee, groups, setEmp, changeEmp, setToggle}) => {
    
    // Adds selected group to groups list or removes if unselected
    const handleOnChangeGroup = (GrID) => {
        // If eployee does not includ group - add this group
        if (!employee.groups.includes(GrID)){
            setEmp({...employee, groups:[...employee.groups, GrID]});
        } else {
            // Filter out GrID form array
            const filteredGroups = employee.groups.filter(group => group !== GrID);
            setEmp({...employee, groups:filteredGroups});
        }
    };

  return (
    <form onSubmit={
        (e)=>{e.preventDefault();
            changeEmp({...employee});
            setToggle && setToggle((prev)=>!prev);}
    }>
        <label>Zmień:
        <input
            type="text"
            value={employee.first_name}
            onChange={(e)=>setEmp({...employee, first_name:e.target.value})}
            name="first_name"
        /><br/>
        <input
            type="text"
            value={employee.last_name}
            onChange={(e)=>setEmp({...employee, last_name:e.target.value})}
            name="last_name"
        />
        <fieldset>
            {groups?.map((group) =>
            <React.Fragment key={group.id}>
                
                <input
                type="checkbox"
                name={group.group_name}
                value={group.id}
                checked={ employee?.groups?.includes(group.id)}
                onChange={()=>handleOnChangeGroup(group.id)}
                />
                <label htmlFor={group.group_name}>{group.group_name}</label>
            </React.Fragment>
            )}
        </fieldset>
        <button>Zapisz</button>
        </label>
    </form>
  )
}

export default EmployeeForm