import React, { useRef } from "react";
import { ShiftsNum, TextInput, CheckBoxRef, DropDownGroupRef } from "../form/Inputs";
import Form from "../form/Form";
import RemoveGroupButton from "./RemoveGroupButton";

const GroupForm = ({submitFunc, setToggle, group, remove, constraints}) => {

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
    <div>
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
    
    { group && <RemoveGroupButton group={group} /> }


    </div>
  )
}

export default GroupForm