import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import ErrorList from '../components/ErrorList'
import useCreateData from '../features/customHooks/useCreateData'
import { CheckBox } from '../components/form/Inputs'
import { addOrRemove } from '../features/utils/arrayUtils'

const ConstraintsPage = () => {

  const [constraints, {getData: getConstraints}] = useGetAndChange({url: "/api/schedule/constraints"});
  const [createdConstraint, create] = useCreateData({url:"/api/schedule/constraints", refreshList:getConstraints});
  const [avaibleConstraints] = useGetAndChange({url: "/api/schedule/avaible-constraints"});
  const [groups, {getData: getGroups}] = useGetAndChange({
    url: "/api/schedule/groups",
    modify: useCallback((arr)=>arr.filter(group => !group.hide),[]) // Hides groups that are hidden
  });

  const [choosedConstraints, setChoosedConstraints] = useState([]);

  const formRef = {
    name: useRef(),
  }

  const errors = [constraints.error, createdConstraint.error, avaibleConstraints.error, groups.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  return (
  <div>
    <p>Constraints Page</p>
      <ul>
        {constraints.data?.map(constraint =>(
          <li key={constraint.id}>
            <span>{constraint.constraint_name} </span>
            <Link to={`/constraints/${constraint.id}`}>Więcej</Link>
          </li>
        ))}
      </ul>

      {createdConstraint.data && <p> Utworzono: {JSON.stringify(createdConstraint.data)}</p>}
      
      <p>Groups:</p>
      <ul>
        {groups.data?.map(group =>
          <li key={group.id}>
            <span>{group.group_name} </span>
            <Link to={`/groups/${group.id}`}>Więcej</Link>
          </li>
        )}
      </ul>

      <p>Avaible Constraints:</p>
      <ul>
        {avaibleConstraints.data?.map(constraint =>
          <li key={constraint.id}>
            <p>{constraint.name} </p>
            <p>{constraint.description}</p>
            <Link to={`/constraints/${constraint.id}`}>Więcej</Link>
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
        getConstraints();
        }}>
        <label>
          Nazwa:
          <input ref={formRef.name} type="text" name="name" />
          {/* (id)=>setCheckedGroups((prev)=>addOrRemove(prev, id)) */}
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