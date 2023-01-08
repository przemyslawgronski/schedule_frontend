export const handleOnChange = (event, setterFunc) => {
    
    const {name, value, type, checked} = event.target;

    setterFunc((prev)=>({
        ...prev,
        [name]: type==="checkbox" ? checked : value
    }));
}

export function parseAndSetObj(event, state = {}) {
  
  // name must be path to endpoint in object
  const names = event.target.name.split('.');

  if (names.length === 1) {
    return {
      ...state,
      [names[0]]: JSON.parse(event.target.value),
    };
  }

  const key = names[0];
  const nestedName = names.slice(1).join('.');

  return {
    ...state,
    [key]: parseAndSetObj( {target: {name: nestedName, value: event.target.value}}, state[key] ),
  };
}