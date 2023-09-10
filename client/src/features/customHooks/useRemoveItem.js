import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { checkForError } from '../utils/checkForError';

const useRemoveItem = ({refreshList}) => {

  const reduxDispatch = useDispatch();

  const [removeError, setRemoveError] = useState(null);

    const remove = async ({name, url, msg}) => {

      const message = msg ? `${msg}\nCzy na pewno usunąć: ${name} ?` : `Czy na pewno usunąć: ${name} ?`;

      if (window.confirm(message) === false) return;

      try{
        const res = await fetch(`${url}`, {
          method: "DELETE",
          headers: {
            "Content-Type":"application/json",
          }
        })

        await checkForError(res, reduxDispatch);

      } catch (error) {
        setRemoveError(error);
      }

      if(refreshList instanceof Function) refreshList();
    }

  return [removeError, remove]
}

export default useRemoveItem