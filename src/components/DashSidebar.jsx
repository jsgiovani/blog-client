import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiChartPie, HiDocumentText, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from '../features/user/userSlice';


const DashSidebar = () => {

  const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();
    const distpatch = useDispatch();
    const [tab, setTab] = useState();
    const navegate = useNavigate();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if (tabFormUrl) {
        setTab(tabFormUrl);
      }
  
    }, [location.search])


    const logout = ()=>{
        distpatch(userLogout());
        navegate('/login');
    }



  return (
    <Sidebar className='w-full'>
      <Sidebar.Items>

        <Sidebar.ItemGroup >

            <Link to="/dashboard?tab=profile">
                <Sidebar.Item 
                    active =  {tab ==='profile' ? true:false}
                    labelColor = {'dark'}
                    label = {currentUser.isAdmin ? 'Admin':'User'}
                    as='div' 
                    icon={HiUser}>
                    Dashboard
                </Sidebar.Item>

            </Link>

            {currentUser.isAdmin && (

            <Link to="/dashboard?tab=posts">
                <Sidebar.Item 
                    active =  {tab ==='posts'}
                    labelColor = {'dark'}
                    as='div' 
                    icon={HiDocumentText}>
                    Posts
                </Sidebar.Item>

            </Link>
            )}


            <Link to="#" onClick={()=>logout()}>
                <Sidebar.Item
                     
                    labelColor = {'dark'}
                    as='div' 
                
                    icon={RiLogoutCircleRLine}>
                    Logout
                </Sidebar.Item>
            </Link>
        </Sidebar.ItemGroup>

      </Sidebar.Items>
    </Sidebar>
  );

}

export default DashSidebar