import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const AdminPrivateRoutes = () => {
    
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.email && currentUser.isAdmin ? <Outlet/>:<Navigate to={'/ '}/>
}

export default AdminPrivateRoutes