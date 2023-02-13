import React from 'react'
import DisplayObject from '../DisplayObject'

const ConstraintData = ({constraint, avaibleConstraint}) => {

  const data = {
    'Nazwa': constraint?.representation,
    'Ostatnia zmiana': constraint?.updated,
  };

  const choosedConstraints = avaibleConstraint?.filter((c) => constraint?.avaible_constraints?.includes(c.id));

  return (
    <>
      <DisplayObject object={data} />
      <p>Użyte ograniczenia</p>
      <ul>
          {choosedConstraints?.map((c) =>(<li key={c.id}>{c.name}</li> ))}
      </ul>
    </>
  )
}

export default ConstraintData