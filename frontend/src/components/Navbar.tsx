import { useEffect, useState } from "react";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Inicio", href: "/" },
        { label: "Comparar", href: "/comparar" },
        { label: "Sobre", href: "/sobre" },
        { label: "Contatos", href: "/suporte" },
    ];

    return (
        <header>
            <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
                <a className="logo" href="/">Simplify</a>
                <div className="mobile-menu">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                <ul className="nav-list">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
