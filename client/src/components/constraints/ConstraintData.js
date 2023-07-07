import React from 'react'
import DisplayObject from '../DisplayObject'

const ConstraintData = ({constraint, availableConstraint}) => {

  const data = {
    'Nazwa:': constraint?.representation,
    'Ostatnia zmiana:': constraint?.updated,
  };

  const choosedConstraints = availableConstraint?.filter((c) => constraint?.available_constraints?.includes(c.id));

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