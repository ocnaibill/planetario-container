import { useUser } from "../../contexts/UserContext";
import { useNavigate, Link } from 'react-router-dom'
import styles from './Header.module.css';
import './background.css'

function Header() {
  const { isAuthenticated, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header>
      <div className="partialsBackgroundColor"></div>
      <div className="partialsBackgroundGradientDesktop"></div>
      <div className="partialsBackgroundImage"></div>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>
          <img className={styles.headerLogoImage} src="src/assets/logo-branca-canto.svg" alt="Logo do planetário" />
        </div>
        <div className={styles.headerButtons}>
          {isAuthenticated ? (
            <>
              <h1 className={styles.greetings}>Boa noite!</h1>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login"><button>Entrar</button></Link>
              <Link to="/registro"><button>Registrar</button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;