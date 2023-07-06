import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../features/user";
import style from "../../styles/login-register-page.module.css"
import ErrorList from "../../components/ErrorList";
import TextInput from "../../components/form/inputs/TextInput";
import EmailInput from "../../components/form/inputs/EmailInput";
import PasswordInput from "../../components/form/inputs/PasswordInput";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {registered, loading} = useSelector(state => state.user);
  const [errors, setErrors] = useState(null);
  const [fieldErrors, setFieldErrors] = useState(null);

  const formRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  useEffect(()=>{
    if (errors) {
      ["email", "password", "first_name", "last_name"].forEach(key => {
        if (Object.hasOwn(errors, key)) {
          setFieldErrors((prev) => ({...prev, [key]: errors[key]})); // Add key to fieldErrors
          setErrors((prev)=>{
            const newErrors = {...prev};
            delete newErrors[key];
            return newErrors;
          }); // Remove key from errors
        }
      })
    }
  },[errors])

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
    }
  }


  //if (errors) return <ErrorList errors={Object.values(errors)} />

//   {
//     "email": [
//         "Istnieje już user account z tą wartością pola email."
//     ]
// }

// {
//   "password": [
//       "To hasło jest za krótkie. Musi zawierać co najmniej 8 znaków.",
//       "To hasło jest zbyt powszechne.",
//       "Hasło składa się wyłącznie z cyfr."
//   ]
// }

// {
//   "first_name": [
//       "To pole nie może być puste."
//   ],
//   "last_name": [
//       "To pole nie może być puste."
//   ]
// }

  return (
    <div className={style.center}>
        {errors && !!Object.keys(errors).length && <ErrorList errors={Object.values(errors)} />}
        <h1>Zarejestruj się</h1>
        <form onSubmit={onSubmit}>
          <TextInput ref={formRef.firstName} label='Imię' errorLabel={fieldErrors?.first_name} />
          <TextInput ref={formRef.lastName} label='Nazwisko' errorLabel={fieldErrors?.last_name} />
          <EmailInput ref={formRef.email} errorLabel={fieldErrors?.email} />
          <PasswordInput ref={formRef.password} label='Hasło' errorLabel={fieldErrors?.password} />
          { loading ? ("ładowanie") : (<button>Rejestracja</button>) }
        </form>
    </div>
  )
}

export default RegisterPage;