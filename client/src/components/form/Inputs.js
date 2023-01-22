import React, { useId } from "react"

const toCamelCase = (str) => {
  let result = str.replace(/\b[a-z]/g, char => char.toUpperCase()); // First letter of each word to upper case
  result = result.replace(/\s+/g, ''); // Remove spaces
  result = result.replace(/^[A-Z]/g, (char) => char.toLowerCase()); // Big letter at beginnig of string to lower case
  return result;
}


export const CheckBox = ({isChecked, changeFunc, name, value, labelText}) => {

  const id = useId();

  return (
    <span>
        <input
        id={id}
          type="checkbox"
          name={name || "checkbox"} // Optional
          value={value || "checkbox"} // Optional
          checked={isChecked}
          onChange={changeFunc}
        />
        { labelText && <label htmlFor={id}>{labelText}</label>} {/* Optional */}
    </span>
  )
}


export const Email = React.forwardRef((_, ref) => {

  const id = useId();

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input ref={ref} id={id} type='email' name='email' required />
    </>
  )
})


export const Password = React.forwardRef((_, ref) => {
  
  const id = useId();

  return (
    <>
      <label htmlFor={id}>Password</label>
      <input ref={ref} id={id} type='password' name='password' required />
    </>
  )
})


export const Text = React.forwardRef(({label}, ref) => {

  const name = toCamelCase(label);
  const id = useId(); 

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input ref={ref} type='text' id={id} name={name} required />
    </>
  )
})

export const ShiftsNum = React.forwardRef((_, ref) => {
  
  const id = useId(); 
  
  return (
    <>
      <label htmlFor={id}>Ilość zmian</label>
      <input ref={ref} type='number' id={id} min="0" max="100" required />
    </>
  )
})