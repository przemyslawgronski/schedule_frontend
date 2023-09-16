import React, { useCallback, useState } from 'react';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import useCreateData from '../features/customHooks/useCreateData';
import ErrorList from '../components/ErrorList/ErrorList';
import { addOrRemove } from '../features/utils/arrayUtils';
import EmployeeForm from '../components/employee/EmployeeForm/EmployeeForm';
import EmployeesData from '../components/employee/EmployeesData';

const EmployeesPage = () => {

  const [empsState, {getData: getEmployees}] = useGetAndChange({url: "/api/schedule/employees"})
  const [groupsState] = useGetAndChange({
    url: "/api/schedule/groups",
    modify: useCallback((arr)=>arr.filter(group => !group.hide),[]) // Hides groups that are hidden
  })
  const [checkedGroupsIDs, setCheckedGroupsIDs] = useState([]);
  const [empState, createEmployee] = useCreateData({url: "/api/schedule/employees", refresh: getEmployees});

  const errors = [empsState.error, empState.error, groupsState.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  if (!Array.isArray(empsState.data) || !Array.isArray(groupsState.data)) return <div><p>Ładowanie...</p></div>;

  const visibleEmployees = empsState.data?.filter(employee => !employee.hide);
  const hiddenEmployees = empsState.data?.filter(employee => employee.hide);

  return (
  <div>
      <h1>Pracownicy</h1>
      <EmployeesData employees={visibleEmployees} groups={groupsState.data} removeInfo={['Ukryty']}/>
      
      {empState.data && <p> Utworzono: {JSON.stringify(empState.data)}</p>}


      {/* TODO: Zrobić 'Dodaj' jak w zmianach, gdzie przenosi do nowego formularza */}
      <EmployeeForm
        allgroups={groupsState.data}
        submitFunc={createEmployee}
        checkedGroups={checkedGroupsIDs}
        onChangeGroup={(id)=>setCheckedGroupsIDs((prev)=>addOrRemove(prev, id))}
        />
      
      <hr/>
      <h3>Ukryci pracownicy:</h3>
      <EmployeesData employees={hiddenEmployees} groups={groupsState.data}/>
  </div>
  )
};

export default EmployeesPage;