import React, { useState } from 'react';
import RemoveItem from '../components/RemoveItem';
import { Link } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import useCreateData from '../features/customHooks/useCreateData';
import ErrorList from '../components/ErrorList';
import { CheckBox } from '../components/form/Inputs';

// TODO: Info, że pracownicy bez grup nie będą uwzględniani w nowych grafikach

const EmployeesPage = () => {

  const [empsState, {getData: getEmployees}] = useGetAndChange({url: "/api/schedule/employees"})
  const [groupsState] = useGetAndChange({url: "/api/schedule/groups"})
  const [newEmployee, setNewEmployee] = useState({firstName:"", lastName:"", groups:[]});
  const [empState, createEmployee] = useCreateData({url: "/api/schedule/employees", refresh: getEmployees});

  const errors = [empsState.error, empState.error, groupsState.error].filter(Boolean);

  if (errors.length) {
      return <ErrorList errors={errors.map(({ message }) => message)} />;
  }

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

  // convert groups ids to its names
  const getGroupsNamesByIds = (groupsIdsArr)=>{
    if(groupsIdsArr?.length===0) return [];
    const groupNames = [];

    groupsIdsArr?.forEach((id) => {
      const foundGroup = groupsState.data?.find((group) => group.id === id);
      if(foundGroup){
        groupNames?.push(foundGroup.group_name);
      }
    })

    return groupNames;
  }

  return (
  <div>
      <p>Pracownicy:</p>

      {/* Nie pokazuj id pracownika i id użytkownika */}
      <ol>
        {empsState.data?.map(employee =>(
            <li key={employee.id}>{Object.keys(employee).filter((item)=>{return item!=="id" && item!=="user"}).map(objKey =>
                <span key={objKey}>
                  , {objKey} - {objKey === "groups" ? getGroupsNamesByIds(employee[objKey]).map((groupName,index)=>(<span key={index}> {groupName} </span>)) : employee[objKey]}
                </span>
              )}
            <RemoveItem name={employee.first_name} url={`/api/schedule/employees/${employee.id}`} refreshList={getEmployees} />
            <Link to={`/employees/${employee.id}`}>Więcej</Link>
            </li>
        ))}
      </ol>
      
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
  </div>
  )
};

export default EmployeesPage;