import { useEffect, useState } from "react";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false); // Estado para o dropdown

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
    { label: "Sobre", href: "/sobre" },
    { label: "Contatos", href: "/suporte" },
    { 
      label: "Serviços", 
      href: "#", 
      dropdown: true, 
      submenu: [
        { label: "Comparar preços", href: "/comparar" },
        { label: "Limpeza", href: "/limpeza" }
      ]
    },
  ];

  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <header>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a className="logo" href="/">SimplifyCode</a>
        <div 
          className={`mobile-menu ${menuActive ? "active" : ""}`} 
          onClick={handleMenuToggle}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className={`nav-list ${menuActive ? "active" : ""}`}>
          {navItems.map((item, index) => (
            item.dropdown ? (
              <li key={index} className="dropdown" onClick={toggleDropdown}>
                <a href={item.href}>{item.label}</a>
                {dropdownActive && (
                  <ul className="dropdown-menu">
                    {item.submenu?.map((submenuItem, idx) => (
                      <li key={idx}>
                        <a href={submenuItem.href}>{submenuItem.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            )
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
