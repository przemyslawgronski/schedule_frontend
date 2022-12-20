import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = () => {

    //const { user, loading, isAuthenticated } = useSelector(state => state.user)
    const { loading, isAuthenticated } = useSelector(state => state.user)

    // Not loading and not authenticated
    if(!isAuthenticated && !loading){
        return <Navigate to='/login' />;
    }

    if(loading) return <p>loading</p>

    return <Outlet/>
};

export default PrivateRoute;

