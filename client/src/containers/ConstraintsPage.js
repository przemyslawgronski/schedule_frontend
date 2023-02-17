import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import ErrorList from '../components/ErrorList'
import useCreateData from '../features/customHooks/useCreateData'
import { CheckBox } from '../components/form/Inputs'
import { addOrRemove } from '../features/utils/arrayUtils'

const ConstraintsPage = () => {

  const [constraints, {getData: getConstraints}] = useGetAndChange({url: "/api/schedule/constraints"});
  const [createdConstraint, create] = useCreateData({url:"/api/schedule/constraints", refresh:getConstraints});
  const [avaibleConstraints] = useGetAndChange({url: "/api/schedule/avaible-constraints"});
  const [choosedConstraints, setChoosedConstraints] = useState([]);

  const formRef = {
    name: useRef(),
  }

  const errors = [constraints.error, createdConstraint.error, avaibleConstraints.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  return (
  <div>
    <p>Constraints Page</p>
      <ul>
        {constraints.data?.map(constraint =>(
          <li key={constraint.id}>
            <span>{constraint.representation} </span>
            <Link to={`/constraints/${constraint.id}`}>Więcej</Link>
          </li>
        ))}
      </ul>

      {createdConstraint.data && <p> Utworzono: {JSON.stringify(createdConstraint.data)}</p>}

      <p>Utwórz zbiór zasad</p>
      <ul>
        {avaibleConstraints.data?.map(constraint =>
          <li key={constraint.id}>
            <p>{constraint.name} </p>
            <p>{constraint.description}</p>
          </li>
        )}
      </ul>

      <p>Create constrints set</p>
      <form onSubmit={(e)=>{
        e.preventDefault();
        create({
          "representation": formRef.name.current.value,
          "avaible_constraints": choosedConstraints
        })
        }}>
        <label>
          Nazwa:
          <input ref={formRef.name} type="text" name="name" />
          <fieldset> Dodaj zasadę:
          {avaibleConstraints.data?.map((constraint) =>
              <CheckBox
                key={constraint.id}
                isChecked={choosedConstraints.includes(constraint.id)}
                changeFunc={()=>setChoosedConstraints((prev)=>addOrRemove(prev, constraint.id))}
                name={constraint.name}
                value={constraint.id}
                labelText={constraint.name}
                />
          )}
        </fieldset>
        </label>
        <button>Utwórz</button>
      </form>
  </div>
  )
}

export default ConstraintsPage