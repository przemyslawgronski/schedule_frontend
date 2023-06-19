import { useRef, useState } from "react";
import { Navigate } from "react-router-dom"; // TODO: Should be useNavigate ??? !!!
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../features/user";
import { Email, Password, TextInput } from "../../components/form/Inputs";
import style from "../../styles/registerpage.module.css"
import ErrorList from "../../components/ErrorList";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {registered, loading} = useSelector(state => state.user);
  const [errors, setErrors] = useState(null);

  const formRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  if (registered) return <Navigate to='/login' />

  const onSubmit = async(e) => {
    e.preventDefault();
    try{
      await dispatch(register({
        first_name: formRef.firstName.current.value,
        last_name: formRef.lastName.current.value,
        email: formRef.email.current.value,
        password: formRef.password.current.value
      })).unwrap();
    } catch (err) {
      setErrors(err);
    // egzample of err:
    //   {
    //     "email": [
    //         "user account with this email already exists."
    //     ]
    // }
    }
  }

  //if (errors) return <ErrorList errors={Object.values(errors)} />

  return (
    <div className={style.center}>
        {errors && <ErrorList errors={Object.values(errors)} />}
        <h1>Zarejestruj się</h1>
        <form onSubmit={onSubmit}>
          <TextInput ref={formRef.firstName} label='Imię' />
          <TextInput ref={formRef.lastName} label='Nazwisko' />
          <Email ref={formRef.email} label='E-mail' />
          <Password ref={formRef.password} label='Hasło' />
          { loading ? ("ładowanie") : (<button>Rejestracja</button>) }
        </form>
    </div>
  )
}

export default RegisterPage;