import React, { useState } from "react";
import styles from './Agendamentos.module.css';
import '../../styles/global.css';
import { useUser } from "../../contexts/UserContext";
import ticketService from "../../services/ticket.services";
import { useNavigate } from "react-router-dom";

function Agendamentos() {
    const [tipoVisita, setTipoVisita] = useState("Visitação Comum");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const { user, isAuthenticated } = useUser()
    const navigate = useNavigate()

    const today = new Date().toISOString().split("T")[0];


    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const horarios = {
        "Visitação Comum": ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
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
            <div className="backgroundGradient"></div>
            <div className="backgroundGradient2"></div>
            <div className="backgroundImage"></div>
            <div className={styles.agendaContent}>
                <div className={styles.mainContainer}>
                    <h1 className={styles.agendaTitle}>Agendamentos</h1>

                    <div className={styles.leftSection}>
                        <label className={styles.labelAgenda} htmlFor="date">Data:</label>
                        <input 
                            id="date" 
                            type="date" 
                            className={styles.inputAgenda} 
                            value={selectedDate} 
                            onChange={handleDateChange} 
                            min={today} 
                        />

                        <label className={styles.labelAgenda} htmlFor="time">Horário:</label>
                        <input 
                            id="time" 
                            type="time" 
                            className={styles.inputAgenda} 
                            value={selectedTime}
                            readOnly
                        />
                    </div>

                    <div className={styles.rightSection}>
                        {horarios[tipoVisita].map((hora) => (
                            <button 
                                key={hora} 
                                className={`${styles.timeOption} ${selectedTime === hora ? styles.active : ""}`} 
                                onClick={() => setSelectedTime(hora)}>
                                {hora}
                            </button>
                        ))}
                    </div>

                    <div className={styles.agendarButtonContainer}>
                        <button 
                            className="confirmButton"
                            onClick={handleSubmit}>
                            Agendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Agendamentos;
