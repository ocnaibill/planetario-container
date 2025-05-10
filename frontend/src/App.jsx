import './styles/variables.css'
import './styles/global.css'

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MobileRoutes from './routes/MobileRoutes';
import { useState, useEffect } from 'react';

import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import Header from './components/layout/Header';
import MobileFooter from './components/layout/MobileFooter';
import MobileHeader from './components/layout/MobileHeader';

function App() {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkScreenSize(); // Verifica o tamanho da tela no carregamento
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Router>
      {isMobile ? (
        <div className={'mobileWrapper'}>
              <div className="backgroundGradient"></div>
              <div className="backgroundGradient2"></div>
              <div className="backgroundImage"></div>
          <MobileHeader user={user} setUser={setUser}/>
          <main>
            <MobileRoutes /> {/* Não está funcionando, para ver a versão mobile da página altere o link no AppRoutes */}
          </main>
          <MobileFooter />
          </div>
      ) : (
      <div className='wrapper'>
        <Header user={user} setUser={setUser} />
        <div className='midContent'>
          <NavBar />
          <main>
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
      )}
    </Router>
  );
}

export default App;