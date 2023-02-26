import React, { useContext } from 'react'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import ErrorList from '../ErrorList'
import { Link } from 'react-router-dom'
import { GroupIdContext } from '../newShift/ChooseGroup'

const ShiftsLinks = () => {

    const groupId = useContext(GroupIdContext);

    const [yearsMonths] = useGetAndChange({url: `api/schedule/groups/${groupId}/years-months-with-shifts`})

    if (yearsMonths.error) return <ErrorList errors={[yearsMonths.error.message]} />

  return (
    <div>
        <h4>Zapisane zmiany:</h4>

        {yearsMonths.data && Object.keys(yearsMonths.data).sort(function(a, b){return b-a}).map((year)=>(
        <div key={year}><p>{year}</p>
            {yearsMonths.data[year].map((month)=>
            <span key={month}>
                <Link to={`/shifts/${year}/${month}`}>{month}</Link>, &nbsp;
            </span>
            )}
        </div>    
        ))}
    </div>
  )
}

export default ShiftsLinks