import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Projects from "./pages/projects/Projects";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route
            path = "/"
            element = {<Home/>}
        />
        <Route
            path = "/about"
            element = {<About/>}
        />
        <Route
            path = "/dashboard"
            element = {<Dashboard/>}
        />
        <Route
            path = "/login"
            element = {<Login/>}
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
    </BrowserRouter>
  )
}