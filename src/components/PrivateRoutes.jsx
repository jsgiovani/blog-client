import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoutes = () => {
    
    const { currentUser} = useSelector((state) => state.user);

  return currentUser && currentUser.email ? <Outlet/>:<Navigate to={'/login'}/>
}

export default PrivateRoutes