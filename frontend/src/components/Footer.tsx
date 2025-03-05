import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/sobre">Sobre</a>
        <a href="/privacidade">Política de Privacidade</a>
        <a href="/suporte">Suporte</a>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
      </div>
      <p>&copy; 2025 SIMPLIFY. Todos os direitos reservados.</p>
      <p>Criado por: Alan Souza</p>
    </footer>
  );
};

export default Footer;
