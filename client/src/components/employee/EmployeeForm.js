import React, {useRef, useState} from "react";
import {CheckBoxRef, TextInput} from "../form/Inputs";
import { pushOrFilter } from "../../features/utils/arrayUtils";

const EmployeeForm = ({employee, groups, changeEmp, remove, setToggle}) => {

    const formRef = {
        first_name: useRef(),
        last_name: useRef(),
        hide: useRef()
    };

    const [empsGroups, setEmpsGroups] = useState([...employee.groups]);

  return (
    <div>
    <form onSubmit={
        (e)=>{e.preventDefault();
            changeEmp({
                first_name: formRef.first_name.current.value,
                last_name: formRef.last_name.current.value,
                groups: empsGroups,
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
                defaultChecked={ empsGroups.includes(group.id)}
                onChange={()=>setEmpsGroups((prev)=>pushOrFilter(prev, group.id))}
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