import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import ErrorList from '../components/ErrorList'
import useCreateData from '../features/customHooks/useCreateData'
import { addOrRemove } from '../features/utils/arrayUtils'
import ConstraintForm from '../components/constraints/ConstraintForm'

const ConstraintsPage = () => {

  const [constraints, {getData: getConstraints}] = useGetAndChange({url: "/api/schedule/constraints"});
  const [createdConstraint, create] = useCreateData({url:"/api/schedule/constraints", refresh:getConstraints});
  const [availableConstraints] = useGetAndChange({url: "/api/schedule/available-constraints"});
  
  // Keep track of which constraints are choosed
  const [choosedConstraints, setChoosedConstraints] = useState([]);

  const errors = [constraints.error, createdConstraint.error, availableConstraints.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  return (
  <div>
    <h1>Ograniczenia</h1>
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
        {availableConstraints.data?.map(constraint =>
          <li key={constraint.id}>
            <p>{constraint.name} </p>
            <p>{constraint.description}</p>
          </li>
        )}
      </ul>

      <ConstraintForm
        availableConstraints={availableConstraints.data}
        submitFunc={create}
        choosedConstraints={choosedConstraints}
        onChangeConstraint={(constraintID)=>setChoosedConstraints((prev)=>addOrRemove(prev, constraintID))}
      />
  </div>
  )
}

export default ConstraintsPage