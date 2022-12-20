const CheckBox = ({isChecked, changeFunc, name, value, labelText}) => {

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

export default CheckBox