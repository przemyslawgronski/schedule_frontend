import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import useCreateData from '../features/customHooks/useCreateData';
import ErrorList from '../components/ErrorList';
import EmployeeData from '../components/employee/EmployeeData';
import CreateEmployeeForm from '../components/employee/CreateEmployeeForm';

const EmployeesPage = () => {

  const [empsState, {getData: getEmployees}] = useGetAndChange({url: "/api/schedule/employees"})
  const [groupsState] = useGetAndChange({
    url: "/api/schedule/groups",
    modify: useCallback((arr)=>arr.filter(group => !group.hide),[]) // Hides groups that are hidden
  })
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [empState, createEmployee] = useCreateData({url: "/api/schedule/employees", refresh: getEmployees});

  const errors = [empsState.error, empState.error, groupsState.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  // Adds selected group to groups list
  // or removes if unselected
  const handleOnChangeGroup = (GrID) => {
    setCheckedGroups((prev) => {
      if (prev.includes(GrID)) {
        return prev.filter((group) => group !== GrID);
      } else {
        return [...prev, GrID];
      }
    });
  };

  const visibleEmployees = empsState.data?.filter(employee => !employee.hide);
  const hiddenEmployees = empsState.data?.filter(employee => employee.hide);

  return (
  <div>
      <p>Pracownicy:</p>

      <ul>
        {visibleEmployees?.map(employee =>(
            <li key={employee.id}>
              <EmployeeData employee={employee} groups={groupsState.data} spanTag={true} removeInfo={['Ukryty']}/>
              <Link to={`/employees/${employee.id}`}>Więcej</Link>
            </li>
        ))}
      </ul>
      
      {empState.data && <p> Utworzono: {JSON.stringify(empState.data)}</p>}

      <CreateEmployeeForm
        createEmployee={createEmployee}
        checkedGroups={checkedGroups}
        groupsState={groupsState}
        handleOnChangeGroup={handleOnChangeGroup}
        />
      
      <div>
        <p>Ukryci pracownicy:</p>
        <ul>
        {hiddenEmployees?.map(employee =>(
          <li key={employee.id}>
            <span key={employee.id}>{employee.first_name}</span>
            <Link to={`/employees/${employee.id}`}>Więcej</Link>
          </li>
        ))}
        </ul>
      </div>
  </div>
  )
};

export default EmployeesPage;