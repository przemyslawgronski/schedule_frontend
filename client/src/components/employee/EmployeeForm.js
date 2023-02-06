import React, {useRef} from "react";
import {CheckBoxRef, TextInput} from "../form/Inputs";

const EmployeeForm = ({employee, groups, changeEmp, remove, setToggle}) => {

    const formRef = {
        first_name: useRef(),
        last_name: useRef(),
        groups: [...employee.groups],
        hide: useRef()
    };
    
    // Adds selected group to groups list or removes if unselected
    const handleOnChangeGroup = (GrID) => {
        if (!employee.groups.includes(GrID)){
            formRef.groups.push(GrID);
        } else {
            formRef.groups = formRef.groups.filter(group => group !== GrID);
        }
    };


                //setEmp({...employee, groups:[...employee.groups, GrID]});

                // Filter out GrID form array

                //const filteredGroups = employee.groups.filter(group => group !== GrID);
                //setEmp({...employee, groups:filteredGroups});

  return (
    <div>
    <form onSubmit={
        (e)=>{e.preventDefault();
            changeEmp({
                first_name: formRef.first_name.current.value,
                last_name: formRef.last_name.current.value,
                groups: formRef.groups,
                hide: formRef.hide.current.checked
            });
            setToggle && setToggle((prev)=>!prev);}
    }>
        <label>Zmień:
        <TextInput ref={formRef.first_name} label="Imię:" defaultValue={employee.first_name} />
        <TextInput ref={formRef.last_name} label="Nazwisko:" defaultValue={employee.last_name} />
        <CheckBoxRef ref={formRef.hide} labelText="Ukryj:" defaultChecked={employee.hide} />

        <fieldset>
            {groups?.map((group) =>
            <React.Fragment key={group.id}>
                
                <input
                type="checkbox"
                name={group.group_name}
                value={group.id}
                defaultChecked={ formRef.groups.includes(group.id)}
                onChange={()=>handleOnChangeGroup(group.id)}
                />
                <label htmlFor={group.group_name}>{group.group_name}</label>
            </React.Fragment>
            )}
        </fieldset>
        <button>Zapisz</button>
        </label>
    </form>

    <button onClick={()=>remove({
        name: employee.first_name,
        url: `/api/schedule/employees/${employee.id}`,
        msg: "Ostrożnie! Usunięcie pracownika spowoduje usunięcie wszystkich związanych z nim zmian. Zamiast tego, możesz ukryć pracownika."
    })}>Usuń</button>
    </div>
  )
}

export default EmployeeForm