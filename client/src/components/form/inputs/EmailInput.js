import React, { useId } from "react"
import style from './input.module.css';

const EmailInput = React.forwardRef(({errorLabel}, ref) => {

    const id = useId()+'email';
  
    return (
      <div className={style.input}>
        <label htmlFor={id}>E-mail:</label>
        <input
            ref={ref}
            id={id}
            type='email'
            name='email'
            required
        />
        {errorLabel && Object.keys(errorLabel).length && <label htmlFor={id}>{errorLabel}</label>}
      </div>
    )
  })

export default EmailInput;