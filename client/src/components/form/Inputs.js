import React from "react"

const toCamelCase = (str) => {
  let result = str.replace(/\b[a-z]/g, char => char.toUpperCase()); // First letter of each word to upper case
  result = result.replace(/\s+/g, ''); // Remove spaces
  result = result.replace(/^[A-Z]/g, (char) => char.toLowerCase()); // Big letter at beginnig of string to lower case
  return result;
}

export const CheckBox = ({isChecked, changeFunc, name, value, labelText}) => {

  return (
    <span>
        <input
          type="checkbox"
          name={name || "checkbox"} // Optional
          value={value || "checkbox"} // Optional
          checked={isChecked}
          onChange={changeFunc}
        />
        { labelText && <label htmlFor={name}>{labelText}</label>} {/* Optional */}
    </span>
  )
}

export const Email = React.forwardRef((_, ref) => {
  return (
    <>
      <label htmlFor='email'>Email</label>
      <input ref={ref} type='email' name='email' required />
    </>
  )
})

export const Password = React.forwardRef((_, ref) => {
  return (
    <>
      <label htmlFor='password'>Password</label>
      <input ref={ref} type='password' name='password' required />
    </>
  )
})

export const Text = React.forwardRef(({label}, ref) => {

  const labelName = toCamelCase(label);

  return (
    <>
      <label htmlFor={labelName}>{label}</label>
      <input ref={ref} type='text' name={labelName} required />
    </>
  )
})