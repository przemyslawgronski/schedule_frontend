import React, {useRef} from 'react'
import { TextInput, CheckBox } from '../form/Inputs'

const CreateEmployeeForm = ({createEmployee, checkedGroups, groupsState, handleOnChangeGroup}) => {

    const formRef = {
        firstName: useRef(null),
        lastName: useRef(null),
      };

  return (
    <form onSubmit={(e)=>{
        e.preventDefault();

        createEmployee({
          first_name: formRef.firstName.current.value,
          last_name: formRef.lastName.current.value,
          groups: checkedGroups
        });
      }}>
      <label>Dodaj pracownika: 
        <TextInput label="Imię" ref={formRef.firstName} />
        <TextInput label="Nazwisko" ref={formRef.lastName} />

        <fieldset>
          {groupsState.data?.map((group) =>
              <CheckBox
                key={group.id}
                isChecked={checkedGroups.includes(group.id)}
                changeFunc={() => handleOnChangeGroup(group.id)}
                name={group.group_name}
                value={group.id}
                labelText={group.group_name}
                />
          )}
        </fieldset>
      </label>
      <input type="submit" />
    </form>
  )
}

export default CreateEmployeeForm