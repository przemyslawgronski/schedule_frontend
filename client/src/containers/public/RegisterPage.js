import { useState } from "react";
import { Navigate } from "react-router-dom"; // TODO: Should be useNavigate ??? !!!
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../features/user";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {registered, loading} = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  // Destructure object to variables to use them directly
  const {first_name, last_name, email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({first_name, last_name, email, password}));
  }
  // if dispatch was successful navigate to login route
  if (registered) return <Navigate to='/login' />

  return (
    <>
        <h1>RegisterPage</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input type='text' name='first_name' onChange={onChange} value={first_name} required />
            <label htmlFor="last_name">Laste Name</label>
            <input type='text' name='last_name' onChange={onChange} value={last_name} required />
            <label htmlFor="email">Email</label>
            <input type='email' name='email' onChange={onChange} value={email} required />
            <label htmlFor="password">Password</label>
            <input type='password' name='password' onChange={onChange} value={password} required />
          </div>
          { loading ? ("loading") : (<button> Register </button>) }
        </form>
    </>
  )
}

export default RegisterPage;