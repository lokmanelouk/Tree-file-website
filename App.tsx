
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Providers } from './components/Providers';
import LandingPage from './app/page';
import DownloadPage from './app/download/page';
import DocsPage from './app/docs/page';
import ChangelogPage from './app/changelog/page';
import PrivacyPage from './app/privacy/page';
import TermsPage from './app/terms/page';
import LicensePage from './app/license/page';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0); // Reset scroll on page change
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Custom event for internal navigation
    const handleNavigate = (e: any) => {
      const path = e.detail;
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };

    window.addEventListener('navigate', handleNavigate);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/download':
        return <DownloadPage key="download" />;
      case '/docs':
        return <DocsPage key="docs" />;
      case '/changelog':
        return <ChangelogPage key="changelog" />;
      case '/privacy':
        return <PrivacyPage key="privacy" />;
      case '/terms':
        return <TermsPage key="terms" />;
      case '/license':
        return <LicensePage key="license" />;
      default:
        return <LandingPage key="home" />;
    }
  };

  return (
    <Providers>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Providers>
  );
};

export default App;
