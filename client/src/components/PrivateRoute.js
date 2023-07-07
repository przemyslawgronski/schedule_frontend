import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = () => {

    const { loading, isAuthenticated } = useSelector(state => state.user)

    if(!isAuthenticated && !loading){
        return <Navigate to='/login' />;
    }

    if(loading) return <p>Ładowanie...</p>

    return <Outlet/>
};

export default PrivateRoute;

