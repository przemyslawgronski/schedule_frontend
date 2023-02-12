import React from "react"
import { CheckBox } from "./form/Inputs"

const ChooseConstraints = ({constraints, handleConstraints}) => {

    return (
    <>
        <p>Wybierz ograniczenia:</p>

        {Object.keys(constraints).map((item)=>
        <React.Fragment key={item}>
            <span>{item}</span>
            <CheckBox isChecked={constraints[item]} changeFunc={()=>handleConstraints(item)} />
        </React.Fragment>
        )}
    </>
  )
}

export default ChooseConstraints