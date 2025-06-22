import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Shop } from './components/Shop';
import { LoginModal } from './components/LoginModal'; // подключаем модалку входа

function App() {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    if (!user) {
      setLoginModalOpen(true);
    }
  };

  const handleLogin = (username) => {
    setUser({ name: username });
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Header
        user={user}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogout}
      />

      <Shop />

      <Footer />

      {isLoginModalOpen && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setLoginModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
