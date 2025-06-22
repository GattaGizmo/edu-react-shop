function Header({ user, onLoginClick, onLogoutClick }) {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <a href="/" className="brand-logo">
          <img src="/logo2.png" alt="logo" className="site-logo" />
          React Shop
        </a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            {user ? (
              <div className="dropdown">
                <a href="#!" className="account-link">
                  <i className="material-icons left">account_circle</i>
                  {user.name}
                </a>
                <ul className="dropdown-content">
                  <li><a href="/account">Профиль</a></li>
                  <li><a href="/orders">Мои заказы</a></li>
                  <li><a href="#!" onClick={onLogoutClick}>Выйти</a></li>
                </ul>
              </div>
            ) : (
              <a href="#!" onClick={onLoginClick} className="account-link">
                <i className="material-icons left">account_circle</i>
                Личный кабинет
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
