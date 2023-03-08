import React, { useContext } from 'react'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import ErrorList from '../ErrorList'
import { Link } from 'react-router-dom'
import { GroupIdContext } from '../newShift/ChooseGroup'
import style from '../../styles/shiftslinks.module.css'
import { dateUtils } from '../../features/utils/dateUtils'

const ShiftsLinks = () => {

    const groupId = useContext(GroupIdContext);

    const [yearsMonths] = useGetAndChange({url: `api/schedule/groups/${groupId}/years-months-with-shifts`})

    if (yearsMonths.error) return <ErrorList errors={[yearsMonths.error.message]} />

  return (
    <div className={style.shiftslink}>
        <h4>Zapisane zmiany:</h4>

        {yearsMonths.data && Object.keys(yearsMonths.data).sort((a, b)=>b-a).map((year)=>(
        <div key={year}><p>{year}</p>
            {yearsMonths.data[year].sort((a,b)=>a-b).map((month)=>
            <span key={month}>
                <Link to={`/shifts/${year}/${month}`}>{month}. {dateUtils.monthName(month-1)}</Link>, &nbsp;
            </span>
            )}
        </div>    
        ))}
    </div>
  )
}

export default ShiftsLinks