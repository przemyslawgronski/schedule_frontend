import React from 'react'
import useRemoveItem from '../features/customHooks/useRemoveItem';
import { useNavigate } from 'react-router-dom';
import ErrorList from './ErrorList';

const RemoveGroupButton = ({group}) => {

    const navigate = useNavigate();
    const [removeError, remove] = useRemoveItem({refreshList: ()=>navigate('/groups')});

    const errors = [removeError].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

  return (
    <button onClick={()=>remove({
        name: group.group_name,
        url: `/api/schedule/groups/${group.id}`,
        msg: "Ostrożnie! Usunięcie grupy spowoduje usunięcie wszystkich zwiazanych z nią zmian. Zamiast tego można ją ukryć."
        })}>Usuń</button>
  )
}

export default RemoveGroupButton