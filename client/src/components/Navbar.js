import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";
import styles from "../styles/navbar.module.css";

const Navbar = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user)
    const [mobileMenuOn, setMobileMenuOn] = useState(false);

    const authLinks = (
        <nav className={mobileMenuOn ? `${styles.logged} ${styles.loggedVisible}` : styles.logged}>
                <NavLink to='/shifts'>Shifts</NavLink>
                <NavLink to='/employees'>Employees</NavLink>
                <NavLink to='/groups'>Groups</NavLink>
                <NavLink to='/constraints'>Constraints</NavLink>
        </nav>
    );

    const guestLinks = (
      <div>
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

    const toggleMenuWidth = () => {
        if (isAuthenticated) {
            document.documentElement.style.setProperty(
                '--left-margin-for-menu',
                document.documentElement.style.getPropertyValue('--menu-width')
            );
        } else {
            document.documentElement.style.setProperty('--left-margin-for-menu', '0');
        };
    }

    toggleMenuWidth();

    return (
    <>
        <nav className={styles.pagetop}>
            <div>
                {isAuthenticated &&
                    <div className={mobileMenuOn ? `${styles.hamburger} ${styles.hamburgerOn}` : styles.hamburger } onClick={()=>setMobileMenuOn(prev=>!prev)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
                <NavLink to='/'>Home</NavLink>
            </div>
            {isAuthenticated ? logOutLinks : guestLinks}
        </nav>
        {isAuthenticated && authLinks}
    </>
    )
};

export default Navbar;