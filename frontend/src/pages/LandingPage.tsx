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
            Encontre ferramentas e apps úteis em segundos! <br/>O <strong>SIMPLIFY</strong> reúne as melhores soluções para você simplificar sua vida com facilidade.
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
