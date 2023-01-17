import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../user';

const useRemoveItem = ({refreshList}) => {

  class ProtectedError extends Error {
    constructor(message) {
      super(message);
      this.name = "ProtectedError";
    }
  }

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
          
          if (resData.error === "ProtectedError"){
            throw new ProtectedError(`Poszę najpierw usunąć powiązane obiekty: ${resData.message}`);
          }
          
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