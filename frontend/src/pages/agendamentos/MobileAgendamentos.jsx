import React, { useState } from "react";
import '../../styles/global.css';
import ticketService from "../../services/ticket.services";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import styles from './MobileAgendamentos.module.css';


function MobileAgendamentos() {
    const [tipoVisita, setTipoVisita] = useState("Visitação Comum");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const { user, isAuthenticated } = useUser();
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const horarios = {
        "Visitação Comum": ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
        "Escolar": ["09:00", "10:00", "11:00"],
        "Sessão Especial": ["21:00", "22:00"]
    };
    
    const handleSubmit = async (e) => {
        if (!isAuthenticated) {
            alert("Usuário não autenticado!")
            navigate('/login')
            return
        }

        if (selectedDate && selectedTime) {
            const session = {
                visitDate: selectedDate,
                visitorId: user.id
            };

           try{
                ticketService.createTicket(session)
                console.log("Agendamento confirmado!");
            }
            catch (e)  {
                console.log(e)
                console.warn(`Erro ao efetuar agendamento: ${e}`)
            }   
        }; 
        
    }

    return (
        <div className={styles.agendaContainer}>

            <div className={styles.agendaContent}>
                <h1 className={styles.agendaTitle}>Agendamentos</h1>

                <label className={styles.labelAgenda}>Tipo de ingresso</label>
                <select
                    className={styles.inputAgenda}
                    value={tipoVisita}
                    onChange={(e) => {
                        setTipoVisita(e.target.value);
                        setSelectedTime("");
                    }}
                >
                    {Object.keys(horarios).map((tipo) => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                </select>

                <label className={styles.labelAgenda}>Data</label>
                <input
                    type="date"
                    className={styles.inputAgenda}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                />

                <label className={styles.labelAgenda}>Horário</label>
                <select
                    className={styles.inputAgenda}
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                >
                    <option value="">Selecione um horário</option>
                    {horarios[tipoVisita].map((hora) => (
                        <option key={hora} value={hora}>{hora}</option>
                    ))}
                </select>

                <button className="confirmButton" onClick={handleSubmit}>
                    Agendar
                </button>
            </div>
        </div>
    );
}

export default MobileAgendamentos;
