
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="img/logo-green.png" alt="Natours" />
      </div>
      <ul className="footer__nav">
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Download</a>
        </li>
        <li>
          <a href="#">Become a guide</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <p className="footer__copyright">
        &copy; By Mahdi Almasi.
      </p>
    </footer>
  );
};

export default Footer;