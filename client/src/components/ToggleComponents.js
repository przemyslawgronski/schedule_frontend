import { useState } from "react";

const ToggleComponents = ({Component1, component1Props, Component2, component2Props}) => {

    const [toggle, setToggle] = useState(false);

    return (
        <div>
                { toggle ?
                <Component1 {...component1Props} setToggle={setToggle}/>
                : <Component2 {...component2Props} />}
        
            <button onClick={() => setToggle(p=>!p)}>{toggle ? 'Anuluj' : 'Zmień'}</button> 
        </div>
    )
}

export default ToggleComponents