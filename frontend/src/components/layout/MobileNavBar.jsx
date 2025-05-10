import styles from './MobileNavBar.module.css'
import '../../styles/global.css';
import { Link } from 'react-router-dom'

function MobileNavBar({ isOpen, onClose }) {

  return (
    <nav className={`${styles.navContainer} ${isOpen ? styles.navVisible : styles.navHidden}`}>
      <div className="partialsBackgroundColor"></div>
      <div className="partialsBackgroundGradient"></div>
      <div className="partialsBackgroundImage"></div>
      <ul className={styles.navList}>
        <li><Link to="/" onClick={onClose}>
          <img src="src/assets/navInicio.svg" alt="ícone casa navegação" />
          <p>Início</p>
        </Link></li>
        <li>
          <Link to="/registro-unico" onClick={onClose}>
          <img 
              src="src/assets/registroUnico.svg" 
              alt="ícone registro único" 
              />
          <p>Visitação Única</p>
          </Link>
        </li>
        <li><Link to="/agendamentos" onClick={onClose}>
          <img src="src/assets/navAgendamento.svg" alt="ícone calendário navegação" />
          <p>Agendamentos</p>
        </Link></li>
        <li><Link to="/ingressos" onClick={onClose}>
          <img src="src/assets/navIngressos.svg" alt="ícone ingresso navegação" />
          <p>Ingressos</p>
        </Link></li>
        <li><Link to="/cupula" onClick={onClose}>
          <img src="src/assets/navIngressos.svg" alt="ícone ingresso cúpula navegação" />
          <p>Cúpula</p>
        </Link></li>
        <li><Link to="/registro-unico" onClick={onClose}>
          <img src="src/assets/navPerfil.png" alt="ícone ingresso minha conta" />
          <p>Minha Conta</p>
        </Link></li>
      </ul>
      <ul className={styles.navList2}>
        <li><a href="https://ouvidoria.df.gov.br/canal-atendimento-162/" onClick={onClose}>
          <img src="src/assets/navInfo.svg" alt="ícone informações navegação" />
          <p>Informações</p>
        </a></li>
      </ul>
    </nav>
  )
}

export default MobileNavBar