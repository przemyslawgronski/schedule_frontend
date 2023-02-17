import React, { useRef } from "react";
import { TextInput } from "../form/Inputs";
import Form from "../form/Form";

const ConstraintForm = ({constraint, changeConstraint, setToggle, remove}) => {

    const representation = useRef()

    const submitFuncReady = ()=>{
        changeConstraint({
            representation: representation.current.value,
            avaible_constraints: constraint.avaible_constraints
        });

        //change view from 'form' to 'data viewer'
        setToggle && setToggle((prev)=>!prev);
    };

  return (
    <div>
    <Form submitFunc={submitFuncReady} legend={constraint ? 'Zmień dane:' : 'Dodaj ograniczenie:'}>
        <TextInput ref={representation} label="Nazwa:" defaultValue={constraint.representation}/>
    </Form>

    <button onClick={()=>remove({
        name: constraint.representation,
        url: `/api/schedule/constraints/${constraint.id}`,
        msg: "Ostrożnie! Usunięcie grupy spowoduje usunięcie wszystkich zwiazanych z nią zmian. Zamiast tego można ją ukryć."
        })}>Usuń</button>

    </div>
  )
}

export default ConstraintForm