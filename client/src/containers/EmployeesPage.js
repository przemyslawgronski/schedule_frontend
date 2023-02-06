import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import useCreateData from '../features/customHooks/useCreateData';
import ErrorList from '../components/ErrorList';
import { CheckBox } from '../components/form/Inputs';
import EmployeeData from '../components/employee/EmployeeData';

const EmployeesPage = () => {

  const [empsState, {getData: getEmployees}] = useGetAndChange({url: "/api/schedule/employees"})
  const [groupsState] = useGetAndChange({url: "/api/schedule/groups"})
  const [newEmployee, setNewEmployee] = useState({firstName:"", lastName:"", groups:[]});
  const [empState, createEmployee] = useCreateData({url: "/api/schedule/employees", refresh: getEmployees});

  const errors = [empsState.error, empState.error, groupsState.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  // Adds selected group to groups list
  // or removes if unselected
  const handleOnChangeGroup = (GrID) => {
    if (!newEmployee.groups.includes(GrID)){
      setNewEmployee((prev)=>{return {...prev, groups:[...prev.groups, GrID]}})
    } else {
      const filteredGroups = newEmployee.groups.filter(group => group !== GrID)
      setNewEmployee((prev)=>{return {...prev, groups:filteredGroups}})
    }
  };

  const visibleEmployees = empsState.data?.filter(employee => !employee.hide);
  const hiddenEmployees = empsState.data?.filter(employee => employee.hide);

  return (
  <div>
      <p>Pracownicy:</p>

      <ul>
        {visibleEmployees?.map(employee =>(
            <li key={employee.id}>
              <EmployeeData employee={employee} groups={groupsState.data} spanTag={true}/>
              <Link to={`/employees/${employee.id}`}>Więcej</Link>
            </li>
        ))}
      </ul>
      
      {empState.data && <p> Utworzono: {JSON.stringify(empState.data)}</p>}

      <form onSubmit={(e)=>{
          e.preventDefault();

          createEmployee({
            first_name: newEmployee.firstName,
            last_name: newEmployee.lastName,
            groups: newEmployee.groups
          });
        }}>
        <label>Dodaj pracownika: 
          <input 
            type="text" 
            value={newEmployee.firstName}
            onChange={(e) => setNewEmployee((prev)=>{return {...prev, firstName:e.target.value }})}
          />
          <input 
            type="text" 
            value={newEmployee.lastName}
            onChange={(e) => setNewEmployee((prev)=>{return {...prev, lastName:e.target.value }})}
          />

          <fieldset>
            {groupsState.data?.map((group) =>
                <CheckBox
                  key={group.id}
                  isChecked={newEmployee.groups.includes(group.id)}
                  changeFunc={() => handleOnChangeGroup(group.id)}
                  name={group.group_name}
                  value={group.id}
                  labelText={group.group_name}
                  />
            )}
          </fieldset>
        </label>
        <input type="submit" />
      </form>
      <div>
        {hiddenEmployees?.map(employee =>(
          <p key={employee.id}>Ukryte: {employee.first_name}</p>      
        ))}
      </div>
  </div>
  )
};

export default EmployeesPage;