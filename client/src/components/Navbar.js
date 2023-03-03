import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";

const Navbar = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user)

    const authLinks = (
        <>
            <NavLink to='/shifts'>Shifts</NavLink>
            <NavLink to='/employees'>Employees</NavLink>
            <NavLink to='/groups'>Groups</NavLink>
            <NavLink to='/constraints'>Constraints</NavLink>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <a href="#!" onClick={()=>dispatch(logout())}> Logout </a>
        </>
    );

    const guestLinks = (
      <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
      </>  
    );


    return (
    <nav>
        <div>
            <NavLink to='/'>Home</NavLink>
        </div>
        <div>
            {isAuthenticated ? authLinks : guestLinks}
        </div>
    </nav> )
};

export default Navbar;