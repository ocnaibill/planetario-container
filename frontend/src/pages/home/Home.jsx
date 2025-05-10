import styles from './Home.module.css'
import '../../styles/global.css';

function Home() {

  return (
    <>
      <div className={styles.homeContainer}>
        <div className="backgroundGradient"></div>
        <div className="backgroundGradient2"></div>
        <div className="backgroundImage"></div>
        <div className={styles.homeContent}>
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
  )
}

export default Home