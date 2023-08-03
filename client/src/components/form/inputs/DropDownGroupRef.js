import React, {useId} from "react";
import style from './input.module.css';

export const DropDownGroupRef = React.forwardRef(({group, constraints, label},ref) => {

    const id = useId()+'DropDownGroupRef';
  
    return (
        <div className={style.input}>
            <label htmlFor={id}>{label}</label>
            <select
              ref={ref}
              id={id}
              defaultValue={group ? group.constraints : ''}
              >
              <option key='-1' value=''>Brak ograniczeń</option>
              { constraints && constraints.map((constraint)=>(
                  <option key={constraint.id} value={constraint.id}>{constraint.representation}</option>
              ))}
            </select>
          </div>
          )
  })