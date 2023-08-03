import React from 'react';
import { Link } from 'react-router-dom';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ErrorList from '../components/ErrorList/ErrorList';
import useCreateData from '../features/customHooks/useCreateData';
import GroupDataBasic from '../components/group/GroupDataBasic';
import GroupForm from '../components/group/GroupForm/GroupForm';

const GroupsPage = () => {

  const [groups, {getData: getGroups}] = useGetAndChange({url: "/api/schedule/groups"});
  const [createdGroup, create] = useCreateData({url:"/api/schedule/groups", refresh:getGroups});
  const [constraints] = useGetAndChange({url:"/api/schedule/constraints"});

  const errors = [groups.error, createdGroup.error, constraints.error].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;

  const visibleGroups = groups.data?.filter(group => !group.hide);
  const hiddenGroups = groups.data?.filter(group => group.hide);

  return (
  <div>
    <p>Groups Page</p>
      <ul>
        {visibleGroups?.map(group =>(
          <li key={group.id}>
            <GroupDataBasic group={group} constraints={constraints.data} spanTag={true}/>
            <Link to={`/groups/${group.id}`}>Więcej</Link>
          </li>
        ))}
      </ul>

      {createdGroup.data && <p> Utworzono: {JSON.stringify(createdGroup.data)}</p>}

      <GroupForm submitFunc={create} constraints={constraints.data}/>

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