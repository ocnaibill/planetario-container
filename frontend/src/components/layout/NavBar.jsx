import styles from './NavBar.module.css'
import './background.css'
import { Link } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

function Footer() {
  const { roles } = useUser()

  return (
    <nav className={styles.navContainer}>
      <div className="partialsBackgroundColor"></div>
      <div className="partialsBackgroundGradientDesktop"></div>
      <div className="partialsBackgroundGradientDesktop2"></div>
      <div className="partialsBackgroundImage"></div>
      <ul className={styles.navList}>
        <li><Link to="/">
          <img src="src/assets/navInicio.svg" alt="ícone casa navegação" />
          <p>Início</p>
        </Link></li>
        <li><Link to="/agendamentos">
          <img src="src/assets/navAgendamento.svg" alt="ícone calendário navegação" />
          <p>Agendamentos</p>
        </Link></li>
        <li><Link to="/ingressos">
          <img src="src/assets/navIngressos.svg" alt="ícone ingresso navegação" />
          <p>Ingressos</p>
        </Link></li>
        <li><Link to="/cupula">
          <img src="src/assets/navIngressos.svg" alt="ícone ingresso cúpula navegação" />
          <p>Cúpula</p>
        </Link></li>
        <li><Link to="/registro-unico">
          <img src="src/assets/navIngressos.svg" alt="ícone ingresso cúpula navegação" />
          <p>Visitantes</p>
        </Link></li>
        {(roles.includes("ROLE_ADMIN")) && (
          <li><Link to="/scanner">
            <img src="src/assets/navScanner.svg" alt="ícone ingresso cúpula navegação" />
            <p>Leitor QR Code</p>
        </Link></li>
        )}
      </ul>
      <ul className={styles.navList2}>
        <li><a href="https://ouvidoria.df.gov.br/canal-atendimento-162/">
          <img src="src/assets/navInfo.svg" alt="ícone informações navegação" />
          <p>Informações</p>
        </a></li>
      </ul>
    </nav>
  )
}

export default Footer