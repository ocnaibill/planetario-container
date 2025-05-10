import styles from "./MobileFooter.module.css";
import './background.css'

const MobileFooter = () => {
   return (
      <footer className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img src="src/assets/logo-branca-canto.svg" alt="Logo do planetário" />
          </div>
          
            <div className={styles.footerContacts}>
              <p>Contatos</p>
              <span>Telefone: (61) 98199-2692
                <br/>E-mail: planetario@secti.df.gov.br</span>
            </div>
            <div className={styles.footerContacts}>
              <p>Endereço</p>
              <span>SDC - Brasília, DF, 70070-350</span>
              <div className={styles.mapWrapper}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.307776432617!2d-47.90166058879583!3d-15.787717222728471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3af46f8174db%3A0x2ede7fe61bd24168!2sPlanet%C3%A1rio%20de%20Bras%C3%ADlia!5e0!3m2!1spt-BR!2sbr!4v1746706346734!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="200"
                  tyle={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa interativo do Planetário de Brasília"
                  />
              </div>              
            </div>
            <div className={styles.GDFLogos}> 
              <a href="https://www.df.gov.br/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="src/assets/GDFLogo.png" 
                  alt="Logo do GDF" 
                  className={styles.logoGDF}  
                />
              </a>
              <a href="https://secti.df.gov.br/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="src/assets/SECTILogo.png" 
                  alt="Logo da SECTI" 
                  className={styles.logoSECTI}  
                />
              </a>
              <a href="http://universidade.df.gov.br/" target="_blank" rel="noopener noreferrer">
                <img 
                  className={`${styles.logoUnDF} ${styles.transparentLogo}`}  
                  src="src/assets/UnDFLogo.png" 
                  alt="Logo da UnDF" 
                />
              </a>
            </div>
          </div>
      </footer>
    );
};

export default MobileFooter;