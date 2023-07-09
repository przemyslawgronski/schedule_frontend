import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { resetRegistered, login } from "../../features/user";
import { Navigate } from "react-router-dom";
import style from "../../styles/login-register-page.module.css"
import EmailInput from "../../components/form/inputs/EmailInput";
import PasswordInput from "../../components/form/inputs/PasswordInput";
import { unwrapResult } from "@reduxjs/toolkit";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, registered } = useSelector(state => state.user)

    const [error, setError] = useState(null);

    const formRef = {
      email: useRef(null),
      password: useRef(null)
    };

    useEffect(()=>{
      if(registered) dispatch(resetRegistered());
    }, [dispatch, registered]);

    if (isAuthenticated) return <Navigate to='/dashboard' />
  
    const onSubmit = async (e) => {
      e.preventDefault();

      try{
       const resultAction = await dispatch( // await is working and has effect
        login({
          email: formRef.email.current.value,
          password: formRef.password.current.value
          })
        );

      unwrapResult(resultAction); // Needed to get error

      } catch(err){
        setError(err.error);
      }
    }

    return (
      <div className={style.center}>
          <h1>Zaloguj się</h1>
          { error && <span className={style.error}>{error}</span> }
          <form onSubmit={onSubmit}>
            <EmailInput ref={formRef.email}/>
            <PasswordInput ref={formRef.password}/>
            { loading ? ("Ładowanie...") : (<button>Logowanie</button>) }
          </form>
      </div>
    )
  }
  
  export default LoginPage;