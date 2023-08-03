import React, { useId } from "react"

export const CheckBox = ({isChecked, changeFunc, name, value, labelText}) => {

  const id = useId()+'checkbox';

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

export const CheckBoxRef = React.forwardRef(({labelText, defaultValue}, ref) => {
  
  const id = useId()+'checkbox';

  return (
    <>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        defaultChecked = {defaultValue || false}
      />
      { labelText && <label htmlFor={id}>{labelText}</label>} {/* Optional */}
    </>
  )
})

export const DropDownRef = React.forwardRef(({label, name, defaultVal, options, valueKey, objKey, objText, onChangeFunc}, ref) => {

  const id = useId()+'DropDownRef';

  const defaultValue = () => {
    if (defaultVal === '') return ''; // JSON.stringify('') === ""
    if (defaultVal) return JSON.stringify(defaultVal);
    if (options) return JSON.stringify(options[0]);
    return '';
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        ref={ref}
        id={id}
        name={name}
        onChange={onChangeFunc}
        defaultValue={defaultValue()}
      >
          {options?.map(option =>(
              <option
                key={objKey ? option[objKey] : option}
                value={valueKey ? (option[valueKey] === '' ? '' : JSON.stringify(option[valueKey])) : JSON.stringify(option)}>
                  {objText ?
                    typeof objText === 'function' ? objText(option) : option[objText]
                  : option}
              </option>
          ))}
      </select>
    </>
  )
})

// Render options to choose. Example:
      //<DropDownRef
            // ref={formRef.constraints}
            // label="Ograniczenia:"
            // options={[{id: '', representation: "Brak ograniczeń"}, ...constraints]}
            // objKey="id"
            // valueKey="id"
            // objText="representation"
            // defaultVal={group ? group.constraints : ''}
            // />