import React from "react"
import CheckBox from "./form/CheckBox"

const ChooseConstraints = ({constraints, handleConstraints}) => {

  // Lepiej zamiast owijać wszystko w wielkiego if-a, zrobić na początku tak:
  //  if (!constraints) return null;
  // a potem już bez if-a czy innego elsa reszta kodu.
  // A najlepiej, to niech się tym nie zajmuje ten komponent, tylko to, 
  // co chce go wyrenderować (przynajmniej ja sądzę, że takie podejście jest lepsze)
  // - ten komponent jest "głupi", nie powinien zawierać zbyt dużo logiki, tylko
  // służyć do wyświetlania odpowiedniej treści.
  //  {constraints && <ChooseConstraints constraints={constraints} handleConstraints={...} />}
  if(constraints){
    return (
      <>
          <p>Wybierz ograniczenia:</p>

          {Object.keys(constraints).map((item)=>
          <React.Fragment key={item}>
              <span>{item}</span>
              <CheckBox isChecked={constraints[item]} changeFunc={()=>handleConstraints(item)} />
          </React.Fragment>
          )}
      </>
    )
  }
}

export default ChooseConstraints