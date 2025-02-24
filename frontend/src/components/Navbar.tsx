import { useState } from "react";
import "../styles/navbar.css";

const Navbar: React.FC = () => {

    const [menuAtivo, setMenuAtivo] = useState(false);

    const toggleMenu = () => {
      setMenuAtivo(!menuAtivo);
    };
    
    const navItems = [
      { label: "Inicio", href: "/" },
      { label: "Sobre", href: "/" },
      { label: "Projetos", href: "/" },
      { label: "Contatos", href: "/" },
    ];

    
    return <header>
        <nav className="nav">
            <a className="logo" href="/">Simplify</a>
            <div className={`mobile-menu ${menuAtivo ? "active" : ""}`} onClick={toggleMenu}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
            <ul className={`nav-list ${menuAtivo ? "active" : ""}`}>
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            animation: menuAtivo
                                ? `navLinkFade 0.5s ease forwards ${(index + 1) * 0.2}s`
                                : "",
                        }}
                    >
                        <a href={item.href}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
}

export default Navbar;