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

  if(removeError || groups?.error || createdGroup?.error){
    return <ErrorList errors={[removeError?.message, groups?.error?.message, createdGroup?.error?.message]} />
  }

  return (
  <div>
    <p>Group Page</p>
      <ul>
        {groups.data?.map(group =>(
          <React.Fragment key={group.id}>
            <li>
              <p>Grupa: {group.group_name}</p>
              <p>Ilość zmian: {group.num_of_shifts}</p>
              <button onClick={()=>remove({
                name:group.group_name,
                url: `/api/schedule/groups/${group.id}`
                })}>Usuń</button>
              <Link to={`/groups/${group.id}`}>Więcej</Link>
            </li>
          </React.Fragment>
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