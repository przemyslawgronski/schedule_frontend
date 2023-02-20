import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import useRemoveItem from '../features/customHooks/useRemoveItem'
import ErrorList from '../components/ErrorList'
import ToggleComponents from '../components/ToggleComponents'
import ConstraintData from '../components/constraints/ConstraintData'
import ConstraintForm from '../components/constraints/ConstraintForm'
import { addOrRemove } from '../features/utils/arrayUtils'

const ConstraintPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [ constraint, {changeData: changeConstraint}]
  = useGetAndChange({url:`/api/schedule/constraints/${id}`});

  const [availableConstraints] = useGetAndChange({url:`/api/schedule/available-constraints`});

  const [removeError, remove] = useRemoveItem({refreshList: ()=>navigate('/constraints')});

    // Keep track of choosed constraints
    const [choosedConstraints, setChoosedConstraints] = useState([]);

    useEffect(() => {
        if (constraint.data?.available_constraints) setChoosedConstraints([...constraint.data.available_constraints]);
    }, [constraint.data?.available_constraints]);

  const errors = [removeError, constraint.error, availableConstraints.error].filter(Boolean);

  if (errors.length) {
      return <ErrorList errors={errors.map(({ message }) => message)} />;
  }

  return (
      <div>
          <p>Grupa:</p>

          <ToggleComponents
              Component1={ConstraintForm}
              component1Props={{
                choosedConstraints: choosedConstraints,
                availableConstraints: availableConstraints.data,
                submitFunc: changeConstraint,
                constraint: constraint.data,
                onChangeConstraint: (constraintID)=>setChoosedConstraints((prev)=>addOrRemove(prev, constraintID)),
                remove: remove,
            }}
              Component2={ConstraintData}
              component2Props={{
                  constraint: constraint.data,
                  availableConstraint: availableConstraints.data,
              }}
          />
      </div>
  )
}

export default ConstraintPage