const Header = () => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a className="nav__el" href="#">
          All Tours
        </a>
      </nav>
      <div className="header__logo">
        <img src="./img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {/* {user ? (
          <>
            <a className="nav__el nav__el--logout" href="/logout">
              Log Out
            </a>
            <a className="nav__el" href="#">
              <img
                className="nav__user-img"
                // src={`../img/users/${user.photo}`}
                // alt={`Photo of ${user.name}`}
              />
              <span>{user.name.split(" ")[0]}</span>
            </a>
          </>
        ) : (
          <>
            <a className="nav__el" href="/login">
              Log in
            </a>
            <a className="nav__el nav__el--cta" href="#">
              Sign Up
            </a>
          </>
        )} */}
      </nav>
    </header>
  );
};

export default Header;
