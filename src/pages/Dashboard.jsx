import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Profile from "./dashboard/Profile";
import DashSidebar from "../components/DashSidebar";
import Posts from "./posts/Posts";
import Users from "./users/Users";

const Dashboard = () => {
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
    <main className="min-h-screen flex flex-col md:flex-row gap-4">

      <div className="md:w-56">
        <DashSidebar/>
      </div>

      {tab ==='profile' && <Profile/>}
      {tab ==='posts' && <Posts/>}
      {tab ==='users' && <Users/>}

    </main>
  )
}

export default Dashboard