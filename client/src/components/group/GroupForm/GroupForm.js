import React, { useRef } from "react";
import { ShiftsNum, CheckBoxRef, DropDownGroupRef } from "../../form/Inputs";
import Form from "../../form/Form";
import RemoveButton from "../../form/RemoveButton";
import TextInput from "../../form/inputs/TextInput";
import style from './GroupForm.module.css'

const GroupForm = ({submitFunc, setToggle, group, constraints}) => {

    const formRef = {
        group_name: useRef(),
        num_of_shifts: useRef(),
        hide: useRef(false),
        constraints: useRef(),
    }

    const submitFuncReady = ()=>{
        submitFunc({
            group_name: formRef.group_name.current.value,
            num_of_shifts: formRef.num_of_shifts.current.value,
            hide: formRef.hide.current.checked,
            constraints: formRef.constraints.current.value,
        })

        setToggle && setToggle((prev)=>!prev);
    };

  return (
    <div className={style.groupForm}>
    <Form submitFunc={submitFuncReady} legend={group ? 'Zmień dane:' : 'Dodaj grupę:'}>
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

        { constraints && <DropDownGroupRef
            ref={formRef.constraints}
            group={group}
            constraints={constraints}
            label='Wybierz ograniczenia:'
            /> }
    </Form>
    
    { group && <RemoveButton
        name = {group.group_name}
        url = {`/api/schedule/groups/${group.id}`}
        after_url = "/groups"
        msg = "Ostrożnie! Usunięcie grupy spowoduje usunięcie wszystkich zwiazanych z nią zmian. Zamiast tego można ją ukryć."
    /> }


    </div>
  )
}

export default GroupForm