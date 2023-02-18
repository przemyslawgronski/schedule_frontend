import React, { useId } from "react"

const toCamelCase = (str) => {
  let result = str.replace(/\b[a-z]/g, char => char.toUpperCase()); // First letter of each word to upper case
  result = result.replace(/\s+/g, ''); // Remove spaces
  result = result.replace(/^[A-Z]/g, (char) => char.toLowerCase()); // Big letter at beginnig of string to lower case
  return result;
}


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


export const Email = React.forwardRef((_, ref) => {

  const id = useId()+'email';

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input ref={ref} id={id} type='email' name='email' required />
    </>
  )
})


export const Password = React.forwardRef((_, ref) => {
  
  const id = useId()+'password';

  return (
    <>
      <label htmlFor={id}>Password</label>
      <input ref={ref} id={id} type='password' name='password' required />
    </>
  )
})


export const TextInput = React.forwardRef(({label, defaultValue}, ref) => {

  const name = toCamelCase(label);
  const id = useId()+name;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        type='text'
        id={id}
        name={name}
        defaultValue={defaultValue || undefined}
        required
        />
    </>
  )
})

export const ShiftsNum = React.forwardRef(({defaultValue}, ref) => {
  
  const id = useId()+'ShiftsNum'; 
  
  return (
    <>
      <label htmlFor={id}>Ilość zmian</label>
      <input
        ref={ref}
        type='number'
        id={id}
        min="0"
        max="100"
        defaultValue={defaultValue == null ? undefined : defaultValue}
        required
      />
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

export const DropDownGroupRef = React.forwardRef(({group, constraints, label},ref) => {

  const id = useId()+'DropDownGroupRef';

  return (
          <>
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
        </>
        )
})