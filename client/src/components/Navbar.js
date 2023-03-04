import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";

const Navbar = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user)

    const authLinks = (
        <>
            <div>
                <NavLink to='/shifts'>Shifts</NavLink>
                <NavLink to='/employees'>Employees</NavLink>
                <NavLink to='/groups'>Groups</NavLink>
                <NavLink to='/constraints'>Constraints</NavLink>
            </div>
            <div>
                <NavLink to='/dashboard'>Dashboard</NavLink>
                <a href="#!" onClick={()=>dispatch(logout())}> Logout </a>
            </div>
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
        <NavLink to='/'>Home</NavLink>
        {isAuthenticated ? authLinks : guestLinks}
    </nav> )
};

export default Navbar;