import { Routes, Route } from "react-router-dom";

import RegisterUnique from "../pages/register/RegisterUnique";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home"
import Ingressos from "../pages/ingressos/Ingressos"
import Agendamentos from '../pages/agendamentos/Agendamentos'
import Cupula from '../pages/cupula/Cupula'
import Perfil from "../components/Perfil";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/registro-unico" element={<RegisterUnique />} />
            <Route path="/ingressos" element={<Ingressos />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/cupula" element={<Cupula />} />
            <Route path="/me" element={<Perfil />} />
        </Routes>
    )
}

export default AppRoutes