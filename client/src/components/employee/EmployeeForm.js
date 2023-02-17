import React, {useRef} from 'react';
import { TextInput, CheckBox, CheckBoxRef } from '../form/Inputs';
import Form from '../form/Form';

const EmployeeForm = ({allgroups, submitFunc, checkedGroups, onChangeGroup, employee, remove, setToggle}) => {
    // employee, remove, setToggle - optional

    const formRef = {
        firstName: useRef(),
        lastName: useRef(),
        hide: useRef(false)
    };

    const submitFuncReady = ()=>{
        submitFunc({
            first_name: formRef.firstName.current.value,
            last_name: formRef.lastName.current.value,
            groups: checkedGroups,
            hide: formRef.hide.current.checked
        });

        setToggle && setToggle((prev)=>!prev);
    };

  return (
    <div>
        <Form submitFunc={submitFuncReady} legend={employee ? 'Zmień dane:' : 'Dodaj pracowanika:'}>
            <TextInput
                ref={formRef.firstName}
                label="Imię:"
                defaultValue={employee ? employee.first_name : ''}
                />
            <TextInput
                ref={formRef.lastName}
                label="Nazwisko:"
                defaultValue={employee ? employee.last_name : ''} />
            {employee && <CheckBoxRef
                ref={formRef.hide}
                labelText="Ukryj:"
                defaultValue={employee.hide}
                />}

            <fieldset>
                <legend>Grupy pracowanika:</legend>
                    {allgroups?.map((group) =>
                    <CheckBox
                        key={group.id}
                        isChecked={checkedGroups.includes(group.id)}
                        changeFunc={() => onChangeGroup(group.id)}
                        name={group.group_name}
                        value={group.id}
                        labelText={group.group_name}
                    />
                    )}
            </fieldset>
        </Form>

        {remove && employee && <button onClick={()=>remove({
            name: employee.first_name,
            url: `/api/schedule/employees/${employee.id}`,
            msg: "Ostrożnie! Usunięcie pracownika spowoduje usunięcie wszystkich związanych z nim zmian. Zamiast tego, możesz ukryć pracownika."
        })}>Usuń</button> }

    </div>
  )
}

export default EmployeeForm