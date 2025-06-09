import React, { useState } from "react";
import '../../styles/global.css';
import Toast from "../../utils/toast";
import ticketService from "../../services/ticket.services";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import styles from './MobileAgendamentos.module.css';

function MobileAgendamentos() {
    const [selectedDate, setSelectedDate] = useState("");
    const { user, isAuthenticated } = useUser();
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        if (!isAuthenticated) {
            Toast.info("Você não está logado!");
            navigate('/login');
            return;
        }

        if (selectedDate) {
            const session = {
                visitDate: selectedDate,
                visitorId: user.id
            };

            try {
                await ticketService.createTicket(session);
                Toast.success("Agendamento confirmado!");
                navigate('/');
            } catch (e) {
                console.error(e);
                Toast.error("Erro ao efetuar agendamento:", e.response.data.message);
            }
        }
    };

    return (
        <div className={styles.agendaContainer}>
            <div className={styles.agendaContent}>
                <h1 className={styles.agendaTitle}>Agendamentos</h1>

                <label className={styles.labelAgenda}>Tipo de ingresso</label>
                <input
                    type="text"
                    className={styles.inputAgenda}
                    value="Visitação Comum"
                    readOnly
                />

                <label className={styles.labelAgenda}>Data</label>
                <input
                    type="date"
                    className={styles.inputAgenda}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                />

                <button className="confirmButton" onClick={handleSubmit}>
                    Agendar
                </button>
            </div>
        </div>
    );
}

export default MobileAgendamentos;