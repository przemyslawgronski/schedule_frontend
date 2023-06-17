import React, { useRef } from "react";
import { TextInput, CheckBox } from "../form/Inputs";
import Form from "../form/Form";
import RemoveButton from "../form/RemoveButton";

const ConstraintForm = ({availableConstraints, choosedConstraints, submitFunc, constraint, onChangeConstraint, setToggle}) => {

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
      
    {constraint && <RemoveButton
        name = {constraint.representation}
        url = {`/api/schedule/constraints/${constraint.id}`}
        after_url = "/constraints"
    /> }

    </div>
  )
}

export default ConstraintForm