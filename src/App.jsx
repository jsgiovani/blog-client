import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Projects from "./pages/projects/Projects";
import Header from "./components/Header";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import PrivateRoutes from "./components/PrivateRoutes";
import Create from "./pages/posts/Create";
import AdminPrivateRoutes from "./components/AdminPrivateRoutes";
import Post from "./pages/posts/Post";
import PostUpdate from "./pages/posts/PostUpdate";

export default function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route
                path = "/"
                element = {<Home/>}
            />
            <Route
                path = "/about"
                element = {<About/>}
            />

            {/* protected routes */}

            <Route element= {<PrivateRoutes/>}>
                <Route
                    path = "/dashboard"
                    element = {<Dashboard/>}
                />
            </Route>


            <Route element= {<AdminPrivateRoutes/>}>
                <Route
                    path = "/posts/create"
                    element = {<Create/>}
                />

                <Route
                    path = "/posts/:id/update"
                    element = {<PostUpdate/>}
                />

            </Route>




            <Route
                path = "/posts/:slug"
                element = {<Post/>}
            />


            <Route
                path = "/login"
                element = {<Login/>}
            />



            <Route
                path = "/register"
                element = {<Register/>}
            />

            <Route
                path = "/logout"
                element = {<Logout/>}
            />

            <Route
                path = "/projects"
                element = {<Projects/>}
            />

        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}