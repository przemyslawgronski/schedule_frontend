import React, { useRef } from "react";
import { TextInput, CheckBox } from "../form/Inputs";
import Form from "../form/Form";

const ConstraintForm = ({availableConstraints, choosedConstraints, submitFunc, constraint, onChangeConstraint, setToggle, remove}) => {

    const representation = useRef();

    const submitFuncReady = ()=>{
        submitFunc({
            representation: representation.current.value,
            available_constraints: choosedConstraints
        });

        setToggle && setToggle((prev)=>!prev);
    };

  return (
    <div>
    <Form submitFunc={submitFuncReady} legend={constraint ? 'Zmień dane:' : 'Dodaj ograniczenie:'}>
        <TextInput ref={representation}
            label="Nazwa:"
            defaultValue={constraint ? constraint.representation : null}
            />
        <fieldset>
            <legend>Dodaj zasadę:</legend>
            {availableConstraints?.map((constraint) =>
              <CheckBox
                key={constraint.id}
                isChecked={choosedConstraints.includes(constraint.id)}
                changeFunc={()=>onChangeConstraint(constraint.id)}
                name={constraint.name}
                value={constraint.id}
                labelText={constraint.name}
                />
          )}
        </fieldset>
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