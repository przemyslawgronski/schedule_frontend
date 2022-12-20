import React, { useEffect, useRef } from "react";
import ErrorList from "../ErrorList";

const GroupForm = ({group, setGroup, changeGroup, batchChange, allEmployees, setAllEmployees, getAllEmployees, setToggle}) => {

    useEffect(() => {
        getAllEmployees(); // Restore actual state of employees groups
    }, [getAllEmployees]);


    const changedEmpsIDs =  useRef(new Set()); // Clicked Employees Ids

    // Adds selected group to groups list or removes if unselected
    const handleOnChangeGroup = (EmpID) => {

        // Deep copy of all employees
        const allEmps = JSON.parse(JSON.stringify(allEmployees.data));

        // Index of clicked employees
        const index = allEmps.findIndex((emp)=>emp.id === EmpID);

        // Clicked Employees Ids
        changedEmpsIDs.current.add(EmpID);
    
        if (!allEmps[index].groups.includes(group.id)){
            // Add employee to group
            allEmps[index].groups.push(group.id);
        } else {
            // Filter out employee from group
            allEmps[index].groups = allEmps[index].groups.filter(id => id !== group.id);
        }
        setAllEmployees(allEmps); // Update all employees but only locally
    };

    if (allEmployees?.error?.message){
        return <ErrorList errors={[allEmployees?.error?.message]}></ErrorList>
    }

  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        
        changeGroup({...group}); // Update group
        
        // Update changed employees to contain group (on backend)
        batchChange(allEmployees.data.filter((emp)=> changedEmpsIDs.current.has(emp.id)));

        //change view from 'form' to 'data viewer'
        setToggle && setToggle((prev)=>!prev);
        }}>
        <label>Zmień:
        <input
            type="text"
            value={group?.group_name}
            onChange={(e)=>setGroup({...group, group_name:e.target.value})}
            name="group_name"
        /><br/>
        <input
            type="number"
            value={group?.num_of_shifts}
            onChange={(e)=>setGroup({...group, num_of_shifts:e.target.value})}
            name="num_of_shifts"
        />
        
        <fieldset>
            {allEmployees?.data?.map((employee) =>
            <React.Fragment key={employee.id}>
                <input
                type="checkbox"
                name={employee.id}
                //value={employee.id}
                checked={ employee.groups.includes(group?.id)}
                onChange={()=>handleOnChangeGroup(employee.id)}
                />
                <label htmlFor={employee.id}>{employee.first_name + " " + employee.last_name}</label>
            </React.Fragment>
            )}
        </fieldset>

        <button>Zapisz</button>
        </label>
    </form>
  )
}

export default GroupForm