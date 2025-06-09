import styles from "./MobileHeader.module.css";
import '../../styles/global.css';
import './background.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";

const MobileHeader = () => {

  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {setMenuAberto(!menuAberto);};


    return (
      <header>
        <div className={styles.headerContent}></div>
            <div className={styles.headerNav}>
                <img className={styles.headerLogoImage}
                 src="/assets/logo-branca-canto.svg"
                 alt="Logo do planetário" 
                  onClick={() => window.location.href = "/"}
                  style={{ cursor: "pointer" }}
                />
                <div className={styles.mobileMenu} onClick={toggleMenu}>
                  <div className={styles.linha1}></div>
                  <div className={styles.linha2}></div>
                  <div className={styles.linha3}></div>
                </div>
            </div>
            <MobileNavBar isOpen={menuAberto} onClose={() => setMenuAberto(false)} />
      </header>
    );
}
  export default MobileHeader;