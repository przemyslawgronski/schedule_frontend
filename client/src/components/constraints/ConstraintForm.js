import React, { useRef } from "react";
import { TextInput } from "../form/Inputs";

const ConstraintForm = ({constraint, changeConstraint, setToggle, remove}) => {

    const formRef = {
        representation: useRef()
    }

  return (
    <div>
    <form onSubmit={(e)=>{
        e.preventDefault();
        
        changeConstraint({
            representation: formRef.representation.current.value,
            avaible_constraints: constraint.avaible_constraints
        });

        //change view from 'form' to 'data viewer'
        setToggle && setToggle((prev)=>!prev);
        }}>

        <TextInput ref={formRef.representation} label="Nazwa:" defaultValue={constraint.representation}/>

        <button>Zapisz</button>
    </form>

    <button onClick={()=>remove({
        name: constraint.representation,
        url: `/api/schedule/constraints/${constraint.id}`,
        msg: "Ostrożnie! Usunięcie grupy spowoduje usunięcie wszystkich zwiazanych z nią zmian. Zamiast tego można ją ukryć."
        })}>Usuń</button>

    </div>
  )
}

export default ConstraintForm