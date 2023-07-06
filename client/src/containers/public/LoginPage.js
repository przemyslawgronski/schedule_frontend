import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { resetRegistered, login } from "../../features/user";
import { Navigate } from "react-router-dom";
import style from "../../styles/login-register-page.module.css"
import EmailInput from "../../components/form/inputs/EmailInput";
import PasswordInput from "../../components/form/inputs/PasswordInput";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, registered } = useSelector(state => state.user)

    const formRef = {
      email: useRef(null),
      password: useRef(null)
    };

    useEffect(()=>{
      if(registered) dispatch(resetRegistered());
    }, [dispatch, registered]);

    if (isAuthenticated) return <Navigate to='/dashboard' />
  
    const onSubmit = e => {
      e.preventDefault();
      dispatch(login({
        email: formRef.email.current.value,
        password: formRef.password.current.value
      }));
    }

    return (
      <div className={style.center}>
          <h1>Log into your account</h1>
          <form onSubmit={onSubmit}>
            <EmailInput ref={formRef.email}/>
            <PasswordInput ref={formRef.password}/>
            { loading ? ("loading") : (<button> Login </button>) }
          </form>
      </div>
    )
  }
  
  export default LoginPage;