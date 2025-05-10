import styles from './MobileHome.module.css';
import '../../styles/global.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function MobileHome() {
  const [saudacao, setSaudacao] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const atualizarSaudacao = () => {
      const agora = new Date();
      const horas = agora.getUTCHours() - 3;
      const horasAjustadas = horas < 0 ? horas + 24 : horas;
      
      if (horasAjustadas >= 5 && horasAjustadas < 12) {
        setSaudacao("Bom Dia");
      } else if (horasAjustadas >= 12 && horasAjustadas < 18) {
        setSaudacao("Boa Tarde");
      } else {
        setSaudacao("Boa Noite");
      }
    };

    atualizarSaudacao();
    
    const intervalo = setInterval(atualizarSaudacao, 60000);
    
    return () => clearInterval(intervalo);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
            <nav className={styles.homeTitle}>
              <p>{saudacao},</p> 
              {user ? (
                <p className={styles.DegradeText}>
                  {user.name.split(' ')[0]} :)
                  {/* Mostra apenas o primeiro nome */}
                </p>
              ) : (
                <p 
                  className={styles.DegradeText}
                  onClick={handleLoginClick}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Faça login aqui!
                </p>
              )}
            </nav>
          
          <div>
            <h1>Sobre o planetário</h1>
            <div className={styles.sobrePlanetario}>
              <div className={styles.imgPlanetarioCima}>
                <img src="src/assets/planetarioSatelite.png" alt="Planetário visto por cima"/>
              </div>
              <p>O Planetário de Brasília é um dos mais avançados da América Latina, com uma cúpula de projeção de 12,5 metros de diâmetro, capaz de simular o céu estrelado em altíssima resolução. Inaugurado em 1974, ele já recebeu milhares de visitantes que se encantaram com a ciência e os mistérios do espaço.</p>
            </div>
          </div>
          <div>
            <h1>Já chegou!?</h1>
            <p>Confirme sua presença no Planetário de Brasília e prepare-se para uma experiência incrível. Não perca a oportunidade de explorar o universo com a gente.</p>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileHome;