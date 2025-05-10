import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Ingressos.module.css';
import '../../styles/global.css';
import IngressoCard from './IngressoCard';
import ticketService from "../../services/ticket.services";
import { useUser } from "../../contexts/UserContext";

const Ingressos = () => {
    function convertDateToDDMMYYYY(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }
    
    const { user } = useUser();
    const firstName = user?.name.split(' ')[0]; 
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0); 


    const getTickets = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const tickets = await ticketService.getMyTickets(user.id);
            const url = "http://localhost:8080";

            const formattedCards = tickets.map(ticket => ({
                image: url + ticket.qrCodePath,
                title: 'Ingresso',
                details: `
                    Data: ${convertDateToDDMMYYYY(ticket.visitDate)}<br/>
                    Código do Ingresso: ${ticket.ticketCode}<br/>
                    Tipo: Sessão`
            }));

            setCards(formattedCards);
        } catch (error) {
            console.error("Erro ao buscar ingressos:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getTickets();
    }, [user]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length); // Vai para o próximo card
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length); // Volta para o card anterior
    };

    if (!user) {
        return (
            <div className={styles.ingressoContainer}>
                <div className={styles.noTickets}>
                    <p>Poxa, você não está logado :(</p>
                    <p>
                        <Link to="/login" className={styles.link}>
                        Faça login aqui mesmo!
                        </Link>{" "}
                        ou{" "}
                        <Link to="/registro-unico" className={styles.link}>
                            faça uma Visitação Única!
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

return (
    <div className={styles.ingressoContainer}>
        {loading ? (
            <p>Carregando ingressos...</p>
        ) : cards.length === 0 ? (
            <div className={styles.noTickets}>
                <p>Olá, {firstName}! Você ainda não tem ingressos :(</p>
                <p>
                    Visite nossa página de{" "}
                    <Link to="/agendamentos" className={styles.link}>
                        agendamentos
                    </Link>
                    !
                </p>
            </div>
        ) : (
            <div className={styles.cardWrapper}>
                <IngressoCard
                    image={cards[currentIndex].image}
                    details={cards[currentIndex].details}
                />
                <div className={styles.pagination}>
                    {cards.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${
                                index === currentIndex ? styles.activeDot : ""
                            }`}
                        ></span>
                    ))}
                </div>
                <button className={styles.prevButton} onClick={handlePrev}>
                    {"<"}
                </button>
                <button className={styles.nextButton} onClick={handleNext}>
                    {">"}
                </button>
            </div>
        )}
    </div>
);
};

export default Ingressos;