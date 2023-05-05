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
    <div className={style.shiftslinks}>
        {yearsMonths.data && Object.keys(yearsMonths.data).sort((a, b)=>b-a).map((year)=>(
          <div key={year}>
            <h4>{year}</h4>
            <div>
            {yearsMonths.data[year].sort((a,b)=>a-b).map((month)=>
                <Link key={month} to={`/shifts/${groupId}/${year}/${month}`}>{month}. {dateUtils.monthName(month-1)}</Link>
            )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ShiftsLinks