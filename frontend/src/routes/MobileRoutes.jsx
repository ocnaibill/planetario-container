import { Routes, Route } from "react-router-dom";

import RegisterUnique from "../pages/register/RegisterUnique";
import Register from "../pages/register/Register";
import Login from "../pages/login/MobileLogin";
import Home from "../pages/home/MobileHome";
import Ingressos from "../pages/ingressos/Ingressos"
import Agendamentos from '../pages/agendamentos/MobileAgendamentos'
import Cupula from '../pages/cupula/Cupula'
import Perfil from "../components/Perfil";

function MobileRoutes() {
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

export default MobileRoutes