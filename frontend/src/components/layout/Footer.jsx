import styles from './Footer.module.css'
import '../layout/background.css';
import '../../styles/global.css';
function Footer() {

  return (
    <footer className={styles.footerContainer}>
        <div className="partialsBackgroundColor"></div>
        <div className="partialsBackgroundGradientDesktop"></div>
        <div className="partialsBackgroundGradientDesktop2"></div>
        <div className="partialsBackgroundImage"></div>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img src="src/assets/logo-branca-canto.svg" alt="Logo do planetário" />
        </div>
        <p className={styles.footerCentralText}>Feito com determinação, amor e inspiração. <br/> Página criada por estudantes universitários da UnDF.<br/> <span>ad astra per aspera.</span></p>
        <div className={styles.footerLastItem}>
          <div className={styles.footerQRBox}>
            <p>Baixe agora o app do Planetário!</p>
            <img src="src/assets/QRCodeFooter.png" alt="QRCode do App" />
            <span>(Disponível momentaneamente
              <br/>apenas para Android)</span>
          </div>
          <div className={styles.GDGLogos}>
            <a href="https://www.df.gov.br/">
              <img src="src/assets/GDFLogo.png" alt="Logo do GDF" />
            </a>
            <a href="https://secti.df.gov.br/">
              <img src="src/assets/SECTILogo.png" alt="Logo da SECTI" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer