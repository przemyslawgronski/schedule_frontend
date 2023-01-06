import { useRef } from "react";
import { Navigate } from "react-router-dom"; // TODO: Should be useNavigate ??? !!!
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../features/user";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {registered, loading} = useSelector(state => state.user);

  const formRef = {
    first_name: useRef(null),
    last_name: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  if (registered) return <Navigate to='/login' />

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({
      first_name: formRef.first_name.current.value,
      last_name: formRef.last_name.current.value,
      email: formRef.email.current.value,
      password: formRef.password.current.value
    }));
  }

  return (
    <>
        <h1>RegisterPage</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input ref={formRef.first_name} type='text' name='first_name' required />
            <label htmlFor="last_name">Laste Name</label>
            <input ref={formRef.last_name} type='text' name='last_name' required />
            <label htmlFor="email">Email</label>
            <input ref={formRef.email} type='email' name='email' required />
            <label htmlFor="password">Password</label>
            <input ref={formRef.password} type='password' name='password' required />
          </div>
          { loading ? ("loading") : (<button> Register </button>) }
        </form>
    </>
  )
}

export default RegisterPage;

// TODO: Wyświetlanie błędów rejestracji i psrawdzanie poprawności wprowadzonych danych na froncie i backendzie