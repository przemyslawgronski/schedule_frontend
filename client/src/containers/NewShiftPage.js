import React, { useEffect, useState, useCallback } from 'react';
import { mapEmpIdToFreeDays } from '../features/pageSpecific/newShiftsFunc';
import { dateUtils } from '../features/utils/dateUtils';
import RenderSolution from '../components/RenderSolution';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';
import ChooseDaysOff from '../components/newShift/ChooseDaysOff';
import ChooseDate from '../components/newShift/ChooseDate';
import ChooseGroup from '../components/newShift/ChooseGroup';
import Form from '../components/form/Form';

const NewShiftPage = () => {

  // TODO: Sprawdzić czy już istnieje w shifts/<int:year>/<int:month>
  // Jeśli tak to wyświetlić komunikat i zapytać co zrobić:
  // przekierować do strony z grafikiem
  // edytować grafik
  // usunąć stary i utworzyć nowy
  const [daysOff, setDaysOff] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [date, setDate] = useState({
    year: dateUtils.nextMonthsYear(),
    month: dateUtils.nextMonth(),
  });
  
  const [{data: empsInGroup, error: empsInGroupError}] = useGetAndChange({
    url:`/api/schedule/groups/${groupId}/employees`,
    test: groupId,
    modify:useCallback((arr)=>arr.filter(emp=>!emp.hide), []) // Filter out hidden employees
  });

  const [{data: solution, error: solutionError}, createSolution, resetSolution] = useCreateData({url:"/api/schedule/render-solution"});
  const [{data: saveSuccess, error: saveError}, saveSolution, resetSave] = useCreateData({url:"/api/schedule/save-solution"});

  useEffect(()=>{
    resetSolution(); // Clear generated schedule and clear save info if something was changed
    resetSave();
  },[daysOff, groupId, date, resetSave, resetSolution])

  const errors = [empsInGroupError, solutionError, saveError].filter(Boolean);

  if (errors.length) {
      return <ErrorList errors={errors.map(({ message }) => message)} />;
  }

  return (
    <>
    <ChooseGroup setGroupId={setGroupId} />
    { empsInGroup?.length > 0 ?
    <ChooseDate date={date} setDate={setDate} >

      <Form
        legend="Nowy grafik"
        submitFunc={()=>createSolution({
          checkedBoxes: mapEmpIdToFreeDays(empsInGroup, daysOff),
          num_days: dateUtils.daysInMonth(date.year, date.month),
          group_id: groupId,
        })}
      >
            

      {!saveSuccess &&  <ChooseDaysOff
          empsInGroup = {empsInGroup}
          date = {date}
          groupId = {groupId}
          setDaysOff = {setDaysOff}
          daysOff = {daysOff}
      />}

        {/* TODO: Pokaż link do wszystkich zmian /shifts */}
        {/* TODO: Zakaz nadpisywania grafików (ta sama grupa, ten sam dzień), tylko modyfikacja */}

      </Form>
    

      { !saveSuccess && solution && 
        <RenderSolution
          employees={empsInGroup}
          solution={solution}
          saveSolution={() => {
            saveSolution({
              month: date.month,
              year: date.year,
              group_id: groupId,
              solution: solution,
            });
            resetSolution(); // Reset generated schedule
          }}
        /> }

      { saveSuccess && <p>{saveSuccess}</p> }
      </ChooseDate>
    : <p>Brak pracowników w grupie</p> }
    </>
  )
}

export default NewShiftPage