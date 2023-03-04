import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";
import styles from "../styles/navbar.module.css";

const Navbar = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user)
    const [active, setActive] = useState(false);

    const authLinks = (
        <nav className={styles.logged}>
                <NavLink to='/shifts'>Shifts</NavLink>
                <NavLink to='/employees'>Employees</NavLink>
                <NavLink to='/groups'>Groups</NavLink>
                <NavLink to='/constraints'>Constraints</NavLink>
        </nav>
    );

    const guestLinks = (
      <div className={styles.login}>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
      </div>  
    );

    const logOutLinks = (
        <div>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <a href="#!" onClick={()=>dispatch(logout())}> Logout </a>
        </div>
    );

    return (
    <div className={styles.navbar}>
        <nav className={styles.pagetop}>
            <div>
                <div className={active ? 'hamburger hamburgerOn' : 'hamburger' } onClick={()=>setActive(!active)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <NavLink to='/'>Home</NavLink>
            </div>
            {isAuthenticated ? logOutLinks : guestLinks}
        </nav>
        {isAuthenticated && authLinks}
    </div>
    )
};

export default Navbar;