import React from "react"

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