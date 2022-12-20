import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetRegistered, login } from "../../features/user";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, registered } = useSelector(state => state.user)

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    useEffect(()=>{
      if(registered) dispatch(resetRegistered());
    }, [dispatch, registered]);

    // Destructure object to variables to use them directly
    const {email, password} = formData;
  
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  
    const onSubmit = e => {
      e.preventDefault();

      dispatch(login({email, password}));
    }

    if (isAuthenticated) return <Navigate to='/dashboard' />

    return (
      <>
          <h1>Log into your account</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={onChange} value={email} required />
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={onChange} value={password} required />
            </div>
            { loading ? ("loading") : (<button> Login </button>) }
          </form>
      </>
    )
  }
  
  export default LoginPage;