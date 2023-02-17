import React from 'react'

const Form = ({children, submitFunc, legend}) => {
  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        submitFunc instanceof Function && submitFunc();
        }}>
        <fieldset>
            {legend && <legend>{legend}</legend>}
                {children}
            <button>Zapisz</button>
        </fieldset>
    </form>
  )
}

export default Form