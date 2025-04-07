import { useEffect, useState } from 'react';
import '../SidBarNavBar/SidBar.css';
import Profil from '../../assets/images/a1.png';

const SidBar = () => {
  const [sidebarHidden, setSidebarHidden] = useState(
    localStorage.getItem('sidebarHidden') === 'true' || window.innerWidth < 768
  );
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('theme') === 'dark');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(localStorage.getItem('activeMenu') || 'Dashboard');

  // Gestion du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setSidebarHidden(isMobile);
      
      if (window.innerWidth > 576) {
        setSearchExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Appliquer le thème au chargement
  useEffect(() => {
    document.body.classList.toggle('dark-theme-variables', darkTheme);
  }, [darkTheme]);

  // Sauvegarder l'état du menu actif
  useEffect(() => {
    localStorage.setItem('activeMenu', activeMenuItem);
  }, [activeMenuItem]);

  // Sauvegarder l'état de la barre latérale
  useEffect(() => {
    localStorage.setItem('sidebarHidden', sidebarHidden.toString());
  }, [sidebarHidden]);

  const toggleSidebar = () => {
    setSidebarHidden((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebarHidden', newState.toString());
      return newState;
    });
  };

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : '');
  };

  const handleSearchClick = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault();
      setSearchExpanded(!searchExpanded);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <>
      {/* SidBar */}
      <section id="sidebar" className={sidebarHidden ? 'hide' : ''}>
        <a href="/" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">APPARTEMENT</span>
        </a>
        <ul className="side-menu top">
          <li className={activeMenuItem === 'Dashboard' ? 'active' : ''}>
            <a href="/" onClick={() => handleMenuItemClick('Dashboard')}>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Tableau de bord</span>
            </a>
          </li>
          <li className={activeMenuItem === 'My Store' ? 'active' : ''}>
            <a href="/listsAppartement" onClick={() => handleMenuItemClick('My Store')}>
              <i className='bx bxs-detail'></i>
              <span className="text">Liste des appartements</span>
            </a>
          </li>
          <li className={activeMenuItem === 'Team' ? 'active' : ''}>
            <a href="/ajoutAppartementSurSudBar" onClick={() => handleMenuItemClick('Team')}>
              <i className='bx bxs-add-to-queue' ></i>
              <span className="text">Ajout d'appartement</span>
            </a>
          </li>
          <li className={activeMenuItem === 'Analytics' ? 'active' : ''}>
            <a href="/histogramme" onClick={() => handleMenuItemClick('Analytics')}>
              <i className='bx bxs-pie-chart-alt-2' ></i>
              <span className="text">Histogramme</span>
            </a>
          </li>
          <li className={activeMenuItem === 'Message' ? 'active' : ''}>
            <a href="/messages" onClick={() => handleMenuItemClick('Message')}>
              <i className="bx bxs-message-dots"></i>
              <span className="text">Message</span>
            </a>
          </li>
        </ul>
        <div className="bottom-menu">
          <ul className="side-menu">
            <li>
              <a href="/parametres">
                <i className="bx bxs-cog"></i>
                <span className="text">Paramètres</span>
              </a>
            </li>
            <li>
              <a href="#" className="logout">
                <i className='bx bx-log-out'></i>
                <span className="text">Déconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* NavBar et Content */}
      <section id="content" style={{
          left: sidebarHidden ? '54px' : '280px',
          width: sidebarHidden ? 'calc(100% - 54px)' : 'calc(100% - 280px)'
        }}>
        <nav>
            <i className="bx bx-menu menu" onClick={toggleSidebar}></i>
            <a href="#" className="nav-link">Catégories</a>
            <form action="#" className={searchExpanded ? 'show' : ''}>
                <div className="form-input">
                <input 
                    type="search" 
                    placeholder="Chercher..." 
                    className={darkTheme ? 'dark-input' : ''}
                />
                <button 
                    type="submit" 
                    className="search-btn" 
                    onClick={handleSearchClick}
                >
                    <i className={`bx ${searchExpanded ? 'bx-x' : 'bx-search'}`}></i>
                </button>
                </div>
            </form>

            <div className="theme-toggler" onClick={toggleTheme}>
                <i className={`bx bxs-brightness-half them ${darkTheme ? 'active' : ''}`}></i>
            </div>

            <a href="#" className="notification">
                <i className="bx bxs-bell"></i>
                <span className="num">0</span>
            </a>

            <div className="right">
                <div className="top">
                    <div className="profile">
                        <div className="info">
                            <p className="admin-nom">Mr, <b>Fred</b></p>
                            <small className="text-muted admin-grad">Administrateur</small>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" className="profile">
                <img src={Profil} alt="Profil" />
            </a>
        </nav>
      </section>
    </>
  );
};

export default SidBar;
