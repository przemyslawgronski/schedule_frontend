import React, { useRef } from "react";
import { ShiftsNum, TextInput, CheckBoxRef } from "../form/Inputs";

const GroupForm = ({group, changeGroup, setToggle, remove}) => {

    const formRef = {
        group_name: useRef(),
        num_of_shifts: useRef(),
        hide: useRef()
    }

  return (
    <div>
    <form onSubmit={(e)=>{
        e.preventDefault();
        
        // Update group
        changeGroup({
            group_name: formRef.group_name.current.value,
            num_of_shifts: formRef.num_of_shifts.current.value,
            hide: formRef.hide.current.checked,
        });

        //change view from 'form' to 'data viewer'
        setToggle && setToggle((prev)=>!prev);
        }}>

        <TextInput ref={formRef.group_name} label="Nazwa:" defaultValue={group.group_name}/>
        <ShiftsNum ref={formRef.num_of_shifts} defaultValue={group.num_of_shifts} />
        <CheckBoxRef ref={formRef.hide} labelText="Ukryj:" defaultValue={group.hide} />

        <button>Zapisz</button>
    </form>

    <button onClick={()=>remove({
        name:group.group_name,
        url: `/api/schedule/groups/${group.id}`,
        msg: "Ostrożnie! Usunięcie grupy spowoduje usunięcie wszystkich zwiazanych z nią zmian. Zamiast tego można ją ukryć."
        })}>Usuń</button>

    </div>
  )
}

export default GroupForm