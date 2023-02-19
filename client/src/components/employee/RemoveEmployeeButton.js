import React from 'react'
import useRemoveItem from '../features/customHooks/useRemoveItem';
import { useNavigate } from 'react-router-dom';
import ErrorList from './ErrorList';

const RemoveEmployeeButton = ({employee}) => {

    const navigate = useNavigate();
    const [removeError, remove] = useRemoveItem({refreshList: ()=>navigate('/employees')});

    const errors = [removeError].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

  return (
    <button onClick={()=>remove({
        name: employee.first_name,
        url: `/api/schedule/employees/${employee.id}`,
        msg: "Ostrożnie! Usunięcie pracownika spowoduje usunięcie wszystkich związanych z nim zmian. Zamiast tego, możesz ukryć pracownika."
    })}>Usuń</button>
  )
}

export default RemoveEmployeeButton