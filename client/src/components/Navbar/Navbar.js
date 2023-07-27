import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/user";
import styles from "./navbar.module.css";

const Navbar = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user)
    const [mobileMenuOn, setMobileMenuOn] = useState(false);

    const authLinks = (
        <nav className={mobileMenuOn ? `${styles.logged} ${styles.loggedVisible}` : styles.logged}>
                <NavLink to='/shifts'       onClick={()=>setMobileMenuOn(false)}>Zmiany</NavLink>
                <NavLink to='/employees'    onClick={()=>setMobileMenuOn(false)}>Pracownicy</NavLink>
                <NavLink to='/groups'       onClick={()=>setMobileMenuOn(false)}>Grupy</NavLink>
                <NavLink to='/constraints'  onClick={()=>setMobileMenuOn(false)}>Zasady</NavLink>
        </nav>
    );

    const guestLinks = (
      <div>
            <NavLink to='/login'>Logowanie</NavLink>
            <NavLink to='/register'>Rejestracja</NavLink>
      </div>  
    );

    const logOutLinks = (
        <div>
            <NavLink to='/dashboard' onClick={()=>setMobileMenuOn(false)}>Panel</NavLink>
            <a href="#!" onClick={()=>{
                setMobileMenuOn(false);
                dispatch(logout());
                }}>Wyloguj</a>
        </div>
    );

    const toggleMenuWidth = () => {
        if (!isAuthenticated) document.documentElement.style.setProperty('--left-margin-for-menu', '0');
        else document.documentElement.style.setProperty('--left-margin-for-menu', '12rem');
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
                <NavLink to='/' onClick={()=>setMobileMenuOn(false)}>Strona domowa</NavLink>
            </div>
            {isAuthenticated ? logOutLinks : guestLinks}
        </nav>
        {isAuthenticated && authLinks}
    </>
    )
};

export default Navbar;