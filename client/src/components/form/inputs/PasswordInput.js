import React, { useId } from "react"
import style from './input.module.css';

const PasswordInput = React.forwardRef(({errorLabel}, ref) => {

    const id = useId()+'password';
  
    return (
      <div className={style.input}>
        <label htmlFor={id}>Hasło:</label>
        <input
            ref={ref}
            id={id}
            type='password'
            name='password'
            required
        />
        {errorLabel && Object.keys(errorLabel).length && <label htmlFor={id}>{errorLabel}</label>}
      </div>
    )
  })

export default PasswordInput;