import React, {useEffect} from 'react'
import LinkEmployees from '../LinkEmployees'
import DropDown from '../form/DropDown'
import ChooseDaysOff from '../ChooseDaysOff'
import { dateUtils } from '../../features/utils/dateUtils'
import { parseAndSetObj } from '../../features/utils/formUtils'
import { safeInvertAtPos } from '../../features/utils/objUtils'
import { create2dArr } from '../../features/utils/arrayUtils'
import { mapEmpIdToFreeDays } from '../../features/pageSpecific/newShiftsFunc'


const FormWithEmps = ({empsInGroup, form, setForm, createSol}) => {

    const handleDaysOff = (pos1, pos2) => setForm( p=> ({ ...p, daysOff: safeInvertAtPos(p.daysOff, [pos1, pos2]) }) );
    const daysCount = dateUtils.daysInMonth(form.date.year, form.date.month);

    useEffect(()=>{
        // Create new empty array
        setForm( p => ({...p, daysOff: create2dArr(daysCount, empsInGroup?.length, false) }) );
    },[daysCount, empsInGroup?.length, form.groupId, form.date, setForm])

  return (
    <>
        <LinkEmployees employees={empsInGroup} />

        <DropDown label="Wybierz rok" name="date.year" defaultVal={dateUtils.nextMonthsYear()}
        options={dateUtils.yearsArray(5)} onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

        <DropDown label="Wybierz miesiąc" name="date.month" defaultVal={dateUtils.nextMonth()} options={dateUtils.monthArray}
        objText={dateUtils.monthName} onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

        <p>Dni w miesiącu: {daysCount}</p>

        <ChooseDaysOff employees={empsInGroup} daysOff={form.daysOff}
        handleDaysOff={handleDaysOff} chosenDaysOff={mapEmpIdToFreeDays(empsInGroup, form.daysOff)} />

        <button onClick={createSol}> Generuj grafik </button><br/>
    </>
  )
}

export default FormWithEmps