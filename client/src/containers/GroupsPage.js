import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useRemoveItem from '../features/customHooks/useRemoveItem';
import { handleOnChange } from '../features/utils/formUtils'
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';

const GroupsPage = () => {

  const [groups, {getData: getGroups}] = useGetAndChange({url: "/api/schedule/groups"});
  const [newGroup, setNewGroup] = useState({group_name:"", num_of_shifts:0});
  const [removeError, remove] = useRemoveItem({refreshList:getGroups});
  const [createdGroup, create] = useCreateData({url:"/api/schedule/groups", refreshList:getGroups});

  const errors = [removeError, groups.error, createdGroup.error].filter(err => Boolean(err) && err.name !== "ProtectedError");

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  return (
  <div>
    <p>Group Page</p>
    {removeError?.name === "ProtectedError" && <p>{removeError.message}</p>}
      <ul>
        {groups.data?.map(group =>(
          <li key={group.id}>
            <p>Grupa: {group.group_name}</p>
            <p>Ilość zmian: {group.num_of_shifts}</p>

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
        create(newGroup);
        getGroups();
      }}>
        <label>Dodaj nową grupę: 
          <input 
            type="text" 
            value={newGroup.group_name}
            name = "group_name"
            onChange={(e) => handleOnChange(e, setNewGroup)}
          />
          <input 
            type="number" 
            value={newGroup.groupShifts}
            name = "num_of_shifts"
            onChange={(e) => handleOnChange(e, setNewGroup)}
          />
        </label>
        <input type="submit" />
      </form>
  </div>
  )
};

export default GroupsPage;