import styles from './Cupula.module.css';
import '../../styles/global.css';
import React, { useState, useEffect } from "react";
import { useUser } from '../../contexts/UserContext';
import ticketService from '../../services/ticket.services';
import { useNavigate } from 'react-router-dom';


function Cupula(){

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [nextDays, setNextDays] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const { user, isAuthenticated } = useUser();
    const navigate = useNavigate()

    const activeColor = "#6a0dad";
    const dateBackground = "#451F6D"
    const timeBackground = "#3D3959";

    useEffect(() => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });

        const days = Array.from({ length: 8 }, (_, i) => {
            const futureDate = new Date();
            futureDate.setDate(now.getDate() + i);
            return {
                date: futureDate.getDate(),
                month: futureDate.getMonth() + 1,
                weekday: formatter.format(futureDate),
                fullDate: futureDate 
            };
        });
        setNextDays(days);
    }, []);

    const getAvailableTimes = (date) => {
        const dayOfWeek = date.fullDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { 
            return ["11:00", "14:30", "16:00", "17:00", "18:00"];
        }
        return ["18:00"];
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setAvailableTimes(getAvailableTimes(day)); 
        setSelectedTime(null);
    };

    const handleSubmit = async (e) => {
        if (!isAuthenticated) {
            alert("Usuário não authenticado.")
            navigate('/login')
            return
        }

        if (selectedDate && selectedTime) {
            const session = {
                visitDate: selectedDate.fullDate.toISOString().split('T')[0],
                visitorId: user.id
            };
            
            try{
                ticketService.createTicket(session)
                alert("Agendamento confirmado!");
            }
            catch (e)  {
                console.log(e)
                alert(`Erro ao efetuar agendamento: ${e}`)
            }  
        }; 
        
    }
        
    return(
        <div className={styles.agendaContainer}>
            <div className={styles.agendaContent}>
                <div className={styles.mainContainer}>
                <h1 className={styles.h1Cupula}>Cúpula</h1>
                     <div className={styles.dates}>
                            {nextDays.map((day, index) => (
                                <label
                                    key={index}
                                    className={styles.dateOption}
                                    style={{
                                        backgroundColor: selectedDate === day ? activeColor : dateBackground,
                                        color: selectedDate === day ? "#fff" : "#000"
                                    }}
                                    onClick={() => handleDateClick(day)}>
                                    <div className={styles.dateText}>
                                        {index === 0 ? <strong>Hoje</strong> : day.weekday}
                                    </div>
                                    <span className={styles.dateText}>{day.date}/{day.month}</span>
                                </label>
                            ))}
                    </div>
                    {selectedDate && (
                        <div className={styles.timeContainer}>
                            <div className={styles.timeSelection}>
                                {availableTimes.map((time, index) => (
                                    <label
                                        key={index}
                                        className={styles.timeOption}
                                        style={{
                                            backgroundColor: selectedTime === time ? activeColor : timeBackground,
                                            color: selectedTime === time ? "#fff" : "#000"
                                        }}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        <div className={styles.dateText}>{time}</div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <button className={styles.buttonConfirmarAgendamento} disabled={!selectedDate || !selectedTime} onClick={handleSubmit}>
                        Confirmar Agendamento
                    </button>
                </div>
            </div>
        </div>
    );
};



export default Cupula;