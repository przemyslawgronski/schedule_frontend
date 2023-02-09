import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';
import GroupDataBasic from '../components/group/GroupDataBasic';
import { TextInput, ShiftsNum } from '../components/form/Inputs';

const GroupsPage = () => {

  const [groups, {getData: getGroups}] = useGetAndChange({url: "/api/schedule/groups"});
  const [createdGroup, create] = useCreateData({url:"/api/schedule/groups", refreshList:getGroups});

  const formRef = {
    group_name: useRef(null),
    num_of_shifts: useRef(null)
  };

  const errors = [groups.error, createdGroup.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  const visibleGroups = groups.data?.filter(group => !group.hide);
  const hiddenGroups = groups.data?.filter(group => group.hide);

  return (
  <div>
    <p>Group Page</p>
      <ul>
        {visibleGroups?.map(group =>(
          <li key={group.id}>
            <GroupDataBasic group={group} spanTag={true}/>
            <Link to={`/groups/${group.id}`}>Więcej</Link>
          </li>
        ))}
      </ul>

      {createdGroup.data && <p> Utworzono: {JSON.stringify(createdGroup.data)}</p>}

      <form onSubmit={(e)=>{
        e.preventDefault();
        create({
          group_name: formRef.group_name.current.value,
          num_of_shifts: formRef.num_of_shifts.current.value,
        });
        getGroups();
      }}>
        <span>Dodaj nową grupę: </span>
        <TextInput label="Nazwa" ref={formRef.group_name} />
        <ShiftsNum ref={formRef.num_of_shifts} />
        <input type="submit" />
      </form>
  
      <p>Ukryte grupy:</p>
      <ul>
        {hiddenGroups?.map(group => 
          <li key={group.id}>
            <span>{group.group_name} </span>
            <Link to={`/groups/${group.id}`}>Więcej</Link>
          </li>
        )}
      </ul>
  </div>
  )
};

export default GroupsPage;