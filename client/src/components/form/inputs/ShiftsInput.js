import React, { useId } from "react"
import style from './input.module.css';

const ShiftsInput = React.forwardRef(({defaultValue}, ref) => {
  
    const id = useId()+'ShiftsNum'; 
    
    return (
      <div className={style.input}>
        <label htmlFor={id}>Ilość zmian:</label>
        <input
          ref={ref}
          type='number'
          id={id}
          min="0"
          max="100"
          defaultValue={defaultValue == null ? undefined : defaultValue}
          required
        />
      </div>
    )
  })

export default ShiftsInput;