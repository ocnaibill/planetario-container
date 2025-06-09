import styles from './MobileNavBar.module.css';
import '../../styles/global.css';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function MobileNavBar({ isOpen, onClose }) {
  const { roles, logout, user } = useUser();

  const handleLogout = async () => {
    await logout();
    console.log('Usuário saiu');
    onClose(); 
  };

  return (
    <nav className={`${styles.navContainer} ${isOpen ? styles.navVisible : styles.navHidden}`}>
      <div className={styles.navBGColor}></div>
      <div className={styles.navBGGradient}></div>
      <div className={styles.navBGImage}></div>
      <ul className={styles.navList}>
        <li><Link to="/" onClick={onClose}>
          <img src="/assets/navInicio.svg" alt="ícone casa navegação" />
          <p>Início</p>
        </Link></li>

        {!user && ( // Exibe "Visitação Única" apenas se não houver usuário logado
          <li>
            <Link to="/registro-unico" onClick={onClose}>
              <img 
                src="/assets/registroUnico.svg" 
                alt="ícone registro único" 
              />
              <p>Visitação Única</p>
            </Link>
          </li>
        )}

        <li><Link to="/agendamentos" onClick={onClose}>
          <img src="/assets/navAgendamento.svg" alt="ícone calendário navegação" />
          <p>Agendamentos</p>
        </Link></li>
        <li><Link to="/ingressos" onClick={onClose}>
          <img src="/assets/navIngressos.svg" alt="ícone ingresso navegação" />
          <p>Ingressos</p>
        </Link></li>

        {(roles.includes("ROLE_ADMIN")) && (
          <li><Link to="/scanner" onClick={onClose}>
            <img src="/assets/navScanner.svg" alt="ícone ingresso cúpula navegação" />
            <p>Leitor QR Code</p>
          </Link></li>
        )}

        {user && (
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sair
            </button>
          </li>
        )}
      </ul>

      <ul className={styles.navList2}>
        <li><a href="https://ouvidoria.df.gov.br/canal-atendimento-162/" onClick={onClose}>
          <img src="/assets/navInfo.svg" alt="ícone informações navegação" />
          <p>Informações</p>
        </a></li>
      </ul>
    </nav>
  );
}

export default MobileNavBar;