import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { resetRegistered, login } from "../../features/user";
import { Navigate } from "react-router-dom";
import { Email, Password } from "../../components/form/Inputs";

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
      <div>
          <h1>Log into your account</h1>
          <form onSubmit={onSubmit}>
            <Email ref={formRef.email}/>
            <Password ref={formRef.password}/>
            { loading ? ("loading") : (<button> Login </button>) }
          </form>
      </div>
    )
  }
  
  export default LoginPage;