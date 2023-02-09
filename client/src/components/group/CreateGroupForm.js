import React, {useRef} from 'react'
import { TextInput, ShiftsNum } from '../form/Inputs'

const CreateGroupForm = ({create, refresh}) => {

    const formRef = {
        group_name: useRef(null),
        num_of_shifts: useRef(null)
      };

  return (
    <form onSubmit={
        (e)=>{
        e.preventDefault();
        create({
          group_name: formRef.group_name.current.value,
          num_of_shifts: formRef.num_of_shifts.current.value,
        });
        refresh();
      }}>
        <span>Dodaj nową grupę: </span>
        <TextInput label="Nazwa" ref={formRef.group_name} />
        <ShiftsNum ref={formRef.num_of_shifts} />
        <input type="submit" />
    </form>
  )
}

export default CreateGroupForm