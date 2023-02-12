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
      year: dateUtils.nextMonthsYear(),
      month: dateUtils.nextMonth(),
    },
    groupId: null,
    daysOff: [],
  });

  // Data from django
  const [{data: groups, error: groupsErrors}] = useGetAndChange({
    url:"/api/schedule/groups",
    modify:useCallback((arr)=>arr.filter(gr=>!gr.hide), []) // Filter out hidden groups
  });

  const [{data: constraints, error: constraintsError}] = useGetAndChange({
    url:"/api/schedule/avaible-constraints"
  });
  
  const [{data: empsInGroup, error: empsInGroupError}] = useGetAndChange({
    url:`/api/schedule/groups/${form.groupId}/employees`,
    test: form.groupId,
    modify:useCallback((arr)=>arr.filter(emp=>!emp.hide), []) // Filter out hidden employees
  });

  const [{data: solution, error: solutionError}, createSolution, resetSolution] = useCreateData({url:"/api/schedule/render-solution"});
  const [{data: saveSuccess, error: saveError}, saveSolution, resetSave] = useCreateData({url:"/api/schedule/save-solution"});

  const [checkedConstraints, setCheckedConstraints] = useState({});

  const daysCount = dateUtils.daysInMonth(form.date.year, form.date.month);
  const handleDaysOff = (pos1, pos2) => setForm( p=> ({ ...p, daysOff: safeInvertAtPos(p.daysOff, [pos1, pos2]) }) )
  
  const createSol = (event) => {
    event.preventDefault();
    createSolution({
      constraints: checkedConstraints,
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

  useEffect(()=>{ // Update checkedConstraints when constraints are loaded
    if (constraints) setCheckedConstraints(toObj(constraints.map(({name})=>name), false));
  }, [constraints])

  useEffect(()=>{ // First render - set default chosen group to groups[0]
    if (groups && groups[0] != null) setForm( p => ({ ...p, groupId: groups[0].id}) );
  }, [groups])

  useEffect(()=>{
      // Create new empty array
      setForm( p => ({...p, daysOff: create2dArr(daysCount, empsInGroup?.length, false) }) );
  },[daysCount, empsInGroup?.length, form.groupId, form.date])

  useEffect(()=>{
    resetSolution(); // Clear generated schedule and clear save info if something was changed
    resetSave();
  },[form, checkedConstraints, resetSave, resetSolution])

  const errors = [groupsErrors, constraintsError, empsInGroupError, solutionError, saveError].filter(Boolean);

  if (errors.length) {
      return <ErrorList errors={errors.map(({ message }) => message)} />;
  }

  return (
    <>
    {groups && checkedConstraints && empsInGroup &&
    
    <form>
      <DropDown label="Wybierz grupę" name="groupId" options={groups} valueKey="id"
      objKey="id" objText="group_name" onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

      <LinkEmployees employees={empsInGroup} />

      <DropDown label="Wybierz rok" name="date.year" defaultVal={dateUtils.nextMonthsYear()}
      options={dateUtils.yearsArray(5)} onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

      <DropDown label="Wybierz miesiąc" name="date.month" defaultVal={dateUtils.nextMonth()} options={dateUtils.monthArray}
      objText={dateUtils.monthName} onChangeFunc={(event)=>setForm(p=>parseAndSetObj(event, p))}/>

      <p>Dni w miesiącu: {daysCount}</p>

      {checkedConstraints && <ChooseConstraints constraints={checkedConstraints} handleConstraints={(key)=>setCheckedConstraints({...checkedConstraints, [key]: !checkedConstraints[key]})} />}

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