import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useRemoveItem from '../features/customHooks/useRemoveItem';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';
import GroupDataBasic from '../components/group/GroupDataBasic';
import { Text, ShiftsNum } from '../components/form/Inputs';

const GroupsPage = () => {

  const [groups, {getData: getGroups}] = useGetAndChange({url: "/api/schedule/groups"});
  const [removeError, remove] = useRemoveItem({refreshList:getGroups});
  const [createdGroup, create] = useCreateData({url:"/api/schedule/groups", refreshList:getGroups});

  const formRef = {
    group_name: useRef(null),
    num_of_shifts: useRef(null)
  };

  const errors = [removeError, groups.error, createdGroup.error].filter(err => Boolean(err) && err.name !== "ProtectedError");

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  return (
  <div>
    <p>Group Page</p>
    {removeError?.name === "ProtectedError" && <p>{removeError.message}</p>}
      <ul>
        {groups.data?.map(group =>(
          <li key={group.id}>
            <GroupDataBasic group={group} spanTag={true}/>

            <button onClick={()=>remove({
              name:group.group_name,
              url: `/api/schedule/groups/${group.id}`
              })}>Usuń</button>
            <Link to={`/groups/${group.id}`}>Więcej</Link>
          </li>
        ))}
      </ul>

      {createdGroup.data && <p> Utworzono: {JSON.stringify(createdGroup.data)}</p>}

      <form onSubmit={(e)=>{
        e.preventDefault();
        create({
          group_name: formRef.group_name.current.value,
          num_of_shifts: formRef.num_of_shifts.current.value
        });
        getGroups();
      }}>
        <span>Dodaj nową grupę: </span>
        <Text label="Nazwa" ref={formRef.group_name} />
        <ShiftsNum ref={formRef.num_of_shifts} />
        <input type="submit" />
      </form>
  </div>
  )
};

export default GroupsPage;