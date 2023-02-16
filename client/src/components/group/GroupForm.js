import React, { useRef } from "react";
import { ShiftsNum, TextInput, CheckBoxRef } from "../form/Inputs";

const GroupForm = ({submitFunc, setToggle, group, remove}) => {

    const formRef = {
        group_name: useRef(),
        num_of_shifts: useRef(),
        hide: useRef(false)
    }

  return (
    <div>
    <form onSubmit={(e)=>{
        e.preventDefault();
        
        submitFunc({
            group_name: formRef.group_name.current.value,
            num_of_shifts: formRef.num_of_shifts.current.value,
            hide: formRef.hide.current.checked,
        });

        setToggle && setToggle((prev)=>!prev);
        }}>

        <fieldset>
            <legend>{ group ? 'Zmień dane:' : 'Dodaj grupę:' }</legend>
            <TextInput
                ref={formRef.group_name}
                label="Nazwa:"
                defaultValue={group ? group.group_name : null}
                />
            <ShiftsNum
                ref={formRef.num_of_shifts}
                defaultValue={group ? group.num_of_shifts : null}
                />
            { group && <CheckBoxRef
                ref={formRef.hide}
                labelText="Ukryj:"
                defaultValue={group.hide}
                /> }

            <button>Zapisz</button>
        </fieldset>
    </form>

    { remove && group && <button onClick={()=>remove({
        name: group.group_name,
        url: `/api/schedule/groups/${group.id}`,
        msg: "Ostrożnie! Usunięcie grupy spowoduje usunięcie wszystkich zwiazanych z nią zmian. Zamiast tego można ją ukryć."
        })}>Usuń</button> }

    </div>
  )
}

export default GroupForm