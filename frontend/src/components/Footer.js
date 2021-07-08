import {React} from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {year} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
