import React, {useRef} from 'react';
import { CheckBox, CheckBoxRef } from '../../form/Inputs';
import Form from '../../form/Form';
import RemoveButton from '../../form/RemoveButton';
import TextInput from '../../form/inputs/TextInput';
import style from './EmployeeForm.module.css';

const EmployeeForm = ({allgroups, submitFunc, checkedGroups, onChangeGroup, employee, setToggle}) => {
    // employee, setToggle - optional

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
    <div className={style.employeeForm}>
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
            <fieldset>
                <legend>Grupy pracowanika:</legend>
                    {allgroups.length === 0 ? <p>Brak grup</p> :
                    allgroups.map((group) =>
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
            <CheckBoxRef
                ref={formRef.hide}
                labelText="Ukryj"
                defaultValue={employee?.hide}
                />
        </Form>

        { employee && <RemoveButton
        name = {employee.first_name}
        url = {`/api/schedule/employees/${employee.id}`}
        after_url = "/employees"
        msg = "Ostrożnie! Usunięcie pracownika spowoduje usunięcie wszystkich związanych z nim zmian. Zamiast tego, możesz ukryć pracownika."
    /> }

    </div>
  )
}

export default EmployeeForm