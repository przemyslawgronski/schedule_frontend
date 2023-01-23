import React, { useEffect, useRef } from "react";
import ErrorList from "../ErrorList";
import { CheckBox, ShiftsNum, TextInput } from "../form/Inputs";

const GroupForm = ({group, changeGroup, batchChange, allEmployees, setAllEmployees, getAllEmployees, setToggle}) => {

    const formRef = {
        group_name: useRef(),
        num_of_shifts: useRef()
    }

    useEffect(() => {
        getAllEmployees(); // Restore actual state of employees groups
    }, [getAllEmployees]);


    const changedEmpsIDs =  useRef(new Set()); // Clicked Employees Ids

    // Adds selected group to groups list or removes if unselected
    const handleOnChangeGroup = (EmpID) => {

        // This employee was changed - add to set
        changedEmpsIDs.current.add(EmpID);

        // Deep copy of all employees
        const allEmps = JSON.parse(JSON.stringify(allEmployees.data));

        // clicked employee
        const emp = allEmps.find((emp)=>emp.id === EmpID);
    
        if (!emp.groups.includes(group.id)){
            // Add employee to group
            emp.groups.push(group.id);
        } else {
            // Filter out employee from group
            emp.groups = emp.groups.filter(id => id !== group.id);
        }
        setAllEmployees(allEmps);
    };

    if (allEmployees?.error?.message){
        return <ErrorList errors={[allEmployees?.error?.message]}></ErrorList>
    }

  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        
        // Update group
        changeGroup({
            group_name: formRef.group_name.current.value,
            num_of_shifts: formRef.num_of_shifts.current.value
        });
        
        // Update changed employees to contain group (on backend)
        batchChange(allEmployees.data.filter((emp)=> changedEmpsIDs.current.has(emp.id)));

        //change view from 'form' to 'data viewer'
        setToggle && setToggle((prev)=>!prev);
        }}>

        <TextInput label="Nazwa:" ref={formRef.group_name} defaultValue={group.group_name}/>
        <ShiftsNum ref={formRef.num_of_shifts} defaultValue={group.num_of_shifts} />
        
        <fieldset>
            {allEmployees?.data?.map((emp) =>
            <CheckBox
                key={emp.id}
                isChecked={emp.groups.includes(group?.id)}
                changeFunc={()=>handleOnChangeGroup(emp.id)}
                labelText={emp.id + ". " + emp.first_name + " " + emp.last_name}
                />
            )}
        </fieldset>

        <button>Zapisz</button>
    </form>
  )
}

export default GroupForm