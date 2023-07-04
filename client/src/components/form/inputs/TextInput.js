import React, { useId } from "react"
import style from './../../../styles/input.module.css';

const toCamelCase = (str) => {
    let result = str.replace(/\b[a-z]/g, char => char.toUpperCase()); // First letter of each word to upper case
    result = result.replace(/\s+/g, ''); // Remove spaces
    result = result.replace(/^[A-Z]/g, (char) => char.toLowerCase()); // Big letter at beginnig of string to lower case
    return result;
  }

const TextInput = React.forwardRef(({label, defaultValue, errorLabel}, ref) => {

    const name = toCamelCase(label);
    const id = useId()+name;
  
    return (
      <div className={style.input}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          type='text'
          id={id}
          name={name}
          defaultValue={defaultValue || undefined}
          required
          />
        {errorLabel && Object.keys(errorLabel).length && <label htmlFor={id}>{errorLabel}</label>}
      </div>
    )
  })

export default TextInput;