import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../user';

const useRemoveItem = ({refreshList}) => {

  const reduxDispatch = useDispatch();

  const [removeError, setRemoveError] = useState(null);

    const remove = async ({name, url}) => {

      if (window.confirm(`Czy na pewno usunąć: ${name} ?`) === false) return;

      try{
        const res = await fetch(`${url}`, {
          method: "DELETE",
          headers: {
            "Content-Type":"application/json",
          }
        })

        if (!res.ok) {
          if (res.status === 401) reduxDispatch(logout());
          const resData = await res.json(); // get error message from server
          throw new Error(`Błąd: ${res.status} ${res.statusText} ${resData.error} ${resData.message}`);
        }

      } catch (error) {
        setRemoveError(error);
      }

      if(refreshList instanceof Function) refreshList();
    }

  return [removeError, remove]
}

export default useRemoveItem