const DropDown = ({label, name, defaultVal, options, value_key, obj_key, obj_text, onChangeFunc}) => {
  return (
    <label>
        {label}
        <select
          name={name}
          onChange={onChangeFunc}
          defaultValue={defaultVal ? JSON.stringify(defaultVal) : options && JSON.stringify(options[0])}
        >
            {options?.map(option =>(
                <option
                  key={obj_key ? option[obj_key] : option}
                  value={value_key ? JSON.stringify(option[value_key]) : JSON.stringify(option)}>
                    {obj_text ?
                      typeof obj_text === 'function' ? obj_text(option) : option[obj_text]
                    : option}
                </option>
            ))}
        </select>
    </label>
  )
}

export default DropDown

// Render options to choose, example:
// <DropDown label={"Coś tam obiekt"} options={[{id:1, test:"a"},{id:2, test:"b"}]} obj_key={"id"} obj_text={"test"} onChangeFunc={()=>c onsole.log("obiekt")}/>
// <DropDown label={"Coś tam tablica"} options={['a','b','c']} onChangeFunc={()=>c onsole.log("tablica")}/>