import { useDispatch } from 'react-redux';
import { logout } from '../features/user';

const RemoveItem = ({name, url, refreshList}) => {

  const dispatch = useDispatch();

    const remove = async () => {

      if (window.confirm(`Czy na pewno usunąć: ${name} ?`) === false) return;

      const res = await fetch(`${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type":"application/json",
        }
      })

      if(res.status === 401) dispatch(logout());

      if(refreshList instanceof Function) refreshList();
    }

  return (
        <button onClick={remove}>usuń</button>
  )
}

export default RemoveItem