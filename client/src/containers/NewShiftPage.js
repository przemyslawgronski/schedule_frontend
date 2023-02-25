import React, { useEffect, useState, useCallback } from 'react';
import { mapEmpIdToFreeDays } from '../features/pageSpecific/newShiftsFunc';
import { dateUtils } from '../features/utils/dateUtils';
import RenderSolution from '../components/RenderSolution';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';
import FormWithEmps from '../components/newShift/FormWithEmps';
import LinkEmployees from '../components/LinkEmployees'
import ChooseDate from '../components/newShift/ChooseDate';
import ChooseGroup from '../components/newShift/ChooseGroup';

const NewShiftPage = () => {

  // TODO: Sprawdzić czy już istnieje w shifts/<int:year>/<int:month>
  // Jeśli tak to wyświetlić komunikat i zapytać co zrobić:
  // przekierować do strony z grafikiem
  // edytować grafik
  // usunąć stary i utworzyć nowy
  const [form, setForm] = useState({
    date: {
      year: dateUtils.nextMonthsYear(),
      month: dateUtils.nextMonth(),
    },
    groupId: null,
    daysOff: [],
  });
  
  const [{data: empsInGroup, error: empsInGroupError}] = useGetAndChange({
    url:`/api/schedule/groups/${form.groupId}/employees`,
    test: form.groupId,
    modify:useCallback((arr)=>arr.filter(emp=>!emp.hide), []) // Filter out hidden employees
  });

  const [{data: solution, error: solutionError}, createSolution, resetSolution] = useCreateData({url:"/api/schedule/render-solution"});
  const [{data: saveSuccess, error: saveError}, saveSolution, resetSave] = useCreateData({url:"/api/schedule/save-solution"});
  
  const createSol = (event) => {
    event.preventDefault();
    createSolution({
      checkedBoxes: mapEmpIdToFreeDays(empsInGroup, form.daysOff),
      num_days: dateUtils.daysInMonth(form.date.year, form.date.month),
      group_id: form.groupId,
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

  useEffect(()=>{
    resetSolution(); // Clear generated schedule and clear save info if something was changed
    resetSave();
  },[form, resetSave, resetSolution])

  const errors = [empsInGroupError, solutionError, saveError].filter(Boolean);

  if (errors.length) {
      return <ErrorList errors={errors.map(({ message }) => message)} />;
  }

  return (
    <>
    
    
    <form>

      <ChooseGroup setForm={setForm} />
      { empsInGroup?.length !== 0 ?
        <>
        <LinkEmployees employees={empsInGroup} />
        <ChooseDate form={form} setForm={setForm} >
          {!saveSuccess &&  <FormWithEmps
              empsInGroup={empsInGroup}
              form={form}
              setForm={setForm}
              createSol={createSol}
          />}
        </ChooseDate>
        </>
        : <p>Brak pracowników w grupie</p> }

      {/* TODO: Pokaż link do wszystkich zmian /shifts */}
      {/* TODO: Zakaz nadpisywania grafików (ta sama grupa, ten sam dzień), tylko modyfikacja */}

    </form>

    { !saveSuccess && solution && <RenderSolution employees={empsInGroup} solution={solution} saveSolution={saveSol} /> }

    { saveSuccess && <p>{saveSuccess}</p> }

    </>
  )
}

export default NewShiftPage