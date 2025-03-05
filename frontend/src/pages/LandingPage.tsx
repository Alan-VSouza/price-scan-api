import React, { useEffect } from "react";
import "../styles/style.css";
import About from "@components/About";
import HowWorks from "@components/HowWorks";
import Contact from "@components/Contact";

const LandingPage: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="home">
        <div className="hero">
          <h1>
            Bem-vindo ao <strong>SIMPLIFY</strong>
          </h1>
          <p>
            Encontre o menor preço em segundos! <br/>O <strong>SIMPLIFY</strong> compara os melhores valores para você economizar sem esforço.  
          </p>
          <a href="#How-works" className="btn-primary">Como funciona</a>
        </div>
      </div>
      <About />
      <HowWorks />
      <Contact />
    </>
  );
};

export default LandingPage;
