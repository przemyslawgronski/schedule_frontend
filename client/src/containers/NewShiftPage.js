import React, { useEffect, useState, useCallback } from 'react';
import { mapEmpIdToFreeDays } from '../features/pageSpecific/newShiftsFunc';
import { parseAndSetObj } from '../features/utils/formUtils';
import { safeInvertAtPos } from '../features/utils/objUtils';
import { toObj, create2dArr } from '../features/utils/arrayUtils';
import DropDown from '../components/form/DropDown';
import { dateUtils } from '../features/utils/dateUtils';
import RenderSolution from '../components/RenderSolution';
import ChooseConstraints from '../components/ChooseConstraints';
import ChooseDaysOff from '../components/ChooseDaysOff';
import LinkEmployees from '../components/LinkEmployees';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';

const NewShiftPage = () => {

  const [form, setForm] = useState({
    date: {
      year: dateUtils.nextMonthsYear,
      month: dateUtils.nextMonth,
    },
    groupId: null,
    daysOff: [],
  });

  // Data from django
  const [{data: groups, error: groupsErrors}] = useGetAndChange({url:"/api/schedule/groups"});
  const [{data: constraints, error: constraintsError}, {setData: setConstraints}] = useGetAndChange({
    url:"/api/schedule/constraints",
    modify:useCallback((arr)=>toObj(arr, false), [])
  });
  const [{data: empsInGroup, error: empsInGroupError}] = useGetAndChange(
    {url:`/api/schedule/groups/${form.groupId}/employees`, test:form.groupId}
  );

  const [{data: solution, error: solutionError}, createSolution, resetSolution] = useCreateData({url:"/api/schedule/render-solution"});
  const [{data: saveSuccess, error: saveError}, saveSolution, resetSave] = useCreateData({url:"/api/schedule/save-solution"});

  const daysCount = dateUtils.daysInMonth(form.date.year, form.date.month);
  const handleDaysOff = (pos1, pos2) => setForm( p=> ({ ...p, daysOff: safeInvertAtPos(p.daysOff, [pos1, pos2]) }) )
  
  const createSol = (event) => {
    event.preventDefault();
    createSolution({
      constraints: constraints,
      checkedBoxes: mapEmpIdToFreeDays(empsInGroup, form.daysOff),
      num_days: dateUtils.daysInMonth(form.date.year, form.date.month),
      num_shifts: groups.find(gr=>gr.id === form.groupId).num_of_shifts,
    });
  }

  const saveSol = () => {
    saveSolution({
      month: form.date.month,
      year: form.date.year,
      group_id: form.groupId,
      solution: solution,
    });
    resetSolution(); // Reset generated schedule
  }

  useEffect(()=>{ // First render - set default chosen group to groups[0]
    if (groups && groups[0] != null) setForm( p => ({ ...p, groupId: groups[0].id}) );
  }, [groups])

  useEffect(()=>{
      // Create new empty array
      setForm( p => ({...p, daysOff: create2dArr(daysCount, empsInGroup?.length, false) }) );
  },[daysCount, empsInGroup?.length, form.groupId, form.date])

  useEffect(()=>{
    resetSolution(); // Clear generated schedule and save info if something was changed
    resetSave();
  },[form, constraints, resetSave, resetSolution])

  if(groupsErrors || constraintsError || empsInGroupError){
    return <ErrorList errors={[
      groupsErrors?.message,
      constraintsError?.message,
      empsInGroupError?.message,
      solutionError?.message,
      saveError?.message,
    ]} />
  }

  return (
    <>

    {groups && constraints && empsInGroup &&
    <form>
      <DropDown label={'Wybierz grupę'} name={"groupId"} options={groups} value_key={'id'}
      obj_key={'id'} obj_text={'group_name'} onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

      <LinkEmployees employees={empsInGroup} />

      <DropDown label={'Wybierz rok'} name={'date.year'} defaultVal={dateUtils.nextMonthsYear}
      options={dateUtils.yearsArr()} onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

      <DropDown label={'Wybierz miesiąc'} name={'date.month'} defaultVal={dateUtils.nextMonth} options={dateUtils.monthArr()}
      obj_text={dateUtils.monthName} onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

      <p>Dni w miesiącu: {daysCount}</p>

      {constraints && <ChooseConstraints constraints={constraints} handleConstraints={(key)=>setConstraints({...constraints, [key]: !constraints[key]})} />}

      <ChooseDaysOff employees={empsInGroup} daysOff={form.daysOff}
      handleDaysOff={handleDaysOff} chosenDaysOff={mapEmpIdToFreeDays(empsInGroup, form.daysOff)} />

      <button onClick={createSol}> Generuj grafik </button><br/>

      {/* TODO: Pokaż link do wszystkich zmian /shifts */}
      {/* TODO: Zakaz nadpisywania grafików (ta sama grupa, ten sam dzień), tylko modyfikacja */}

    </form>}

    { solution && <RenderSolution employees={empsInGroup} solution={solution} saveSolution={saveSol} /> }

    { saveSuccess && <p>{saveSuccess}</p> }

    </>
  )
}

export default NewShiftPage