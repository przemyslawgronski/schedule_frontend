import { useRef } from "react";
import { Navigate } from "react-router-dom"; // TODO: Should be useNavigate ??? !!!
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../features/user";
import { Email, Password, TextInput } from "../../components/form/Inputs";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {registered, loading} = useSelector(state => state.user);

  const formRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  if (registered) return <Navigate to='/login' />

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({
      first_name: formRef.firstName.current.value,
      last_name: formRef.lastName.current.value,
      email: formRef.email.current.value,
      password: formRef.password.current.value
    }));
  }

  return (
    <>
        <h1>RegisterPage</h1>
        <form onSubmit={onSubmit}>
          <TextInput ref={formRef.firstName} label='First Name' />
          <TextInput ref={formRef.lastName} label='Last Name' />
          <Email ref={formRef.email} />
          <Password ref={formRef.password} />
          { loading ? ("loading") : (<button> Register </button>) }
        </form>
    </>
  )
}

export default RegisterPage;

// TODO: Wyświetlanie błędów rejestracji i sprawdzanie poprawności wprowadzonych danych na froncie i backendzie