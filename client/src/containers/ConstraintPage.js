import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import useRemoveItem from '../features/customHooks/useRemoveItem'
import ErrorList from '../components/ErrorList'
import ToggleComponents from '../components/ToggleComponents'
import ConstraintData from '../components/constraints/ConstraintData'
import ConstraintForm from '../components/constraints/ConstraintForm'

const ConstraintPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [ constraint, {changeData: changeConstraint}]
  = useGetAndChange({url:`/api/schedule/constraints/${id}`});

  const [ avaibleConstraint] = useGetAndChange({url:`/api/schedule/avaible-constraints`});

  const [removeError, remove] = useRemoveItem({refreshList: ()=>navigate('/constraints')});

  const errors = [removeError, constraint.error, avaibleConstraint.error].filter(Boolean);

  if (errors.length) {
      return <ErrorList errors={errors.map(({ message }) => message)} />;
  }

  return (
      <div>
          <p>Grupa:</p>

          <ToggleComponents
              Component1={ConstraintForm}
              component1Props={{
                constraint: constraint.data,
                changeConstraint,
                remove
            }}
              Component2={ConstraintData}
              component2Props={{
                  constraint: constraint.data,
                  avaibleConstraint: avaibleConstraint.data,
              }}
          />
      </div>
  )
}

export default ConstraintPage