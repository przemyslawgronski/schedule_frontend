const DropDown = ({label, name, defaultVal, options, valueKey, objKey, objText, onChangeFunc}) => (
    <label>
        {label}
        <select
          name={name}
          onChange={onChangeFunc}
          defaultValue={defaultVal ? JSON.stringify(defaultVal) : options && JSON.stringify(options[0])}
        >
            {options?.map(option =>(
                <option
                  key={objKey ? option[objKey] : option}
                  value={valueKey ? JSON.stringify(option[valueKey]) : JSON.stringify(option)}>
                    {objText ?
                      typeof objText === 'function' ? objText(option) : option[objText]
                    : option}
                </option>
            ))}
        </select>
    </label>
  )

export default DropDown

// Render options to choose. Example:
// <DropDown label="Coś tam obiekt" options={[{id:1, test:"a"},{id:2, test:"b"}]} obj_key="id" obj_text="test" onChangeFunc={()=>c onsole.log("obiekt")}/>
// <DropDown label="Coś tam tablica" options={['a','b','c']} onChangeFunc={()=>c onsole.log("tablica")}/>