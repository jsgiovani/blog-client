import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';


const DashSidebar = () => {

    const location = useLocation();

    const [tab, setTab] = useState();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if (tabFormUrl) {
        setTab(tabFormUrl);
      }
  
    }, [location.search])


  return (
    <Sidebar className='w-full'>
      <Sidebar.Items>

        <Sidebar.ItemGroup >

            <Link to="/dashboard?tab=profile">
                <Sidebar.Item 
                    active =  {tab ==='profile' ? true:false}
                    labelColor = {'dark'}
                    label = {'user'}
                    as='div' 
                    icon={HiUser}>
                    Dashboard
                </Sidebar.Item>

            </Link>

            <Link to="/logout">
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