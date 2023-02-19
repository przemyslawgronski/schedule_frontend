import React, { useEffect, useState, useCallback } from 'react';
import { mapEmpIdToFreeDays } from '../features/pageSpecific/newShiftsFunc';
import { parseAndSetObj } from '../features/utils/formUtils';
import DropDown from '../components/form/DropDown';
import { dateUtils } from '../features/utils/dateUtils';
import RenderSolution from '../components/RenderSolution';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';
import FormWithEmps from '../components/newShift/FormWithEmps';

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
    if (constraints) setCheckedConstraints(constraints.reduce((acc, {name})=>({...acc, [name]: false}), {}));
  }, [constraints])

  useEffect(()=>{ // First render - set default chosen group to groups[0]
    if (groups && groups[0] != null) setForm( p => ({ ...p, groupId: groups[0].id}) );
  }, [groups])

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

      { empsInGroup.length !== 0 ?
        <FormWithEmps
            empsInGroup={empsInGroup}
            checkedConstraints={checkedConstraints}
            form={form}
            setForm={setForm}
            createSol={createSol}
            setCheckedConstraints={setCheckedConstraints}
        /> : <p>Brak pracowników w grupie</p> }

      {/* TODO: Pokaż link do wszystkich zmian /shifts */}
      {/* TODO: Zakaz nadpisywania grafików (ta sama grupa, ten sam dzień), tylko modyfikacja */}

    </form>}

    { solution && <RenderSolution employees={empsInGroup} solution={solution} saveSolution={saveSol} /> }

    { saveSuccess && <p>{saveSuccess}</p> }

    </>
  )
}

export default NewShiftPage