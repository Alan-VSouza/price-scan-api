import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaChartBar, FaShoppingCart } from "react-icons/fa";
import "../styles/howworks.css"; // 🔄 Importando o CSS separado

const HowWorks: React.FC = () => {
  return (
    <div id="How-works" className="how-it-works">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        Como Funciona?
      </motion.h2>

      <div className="steps-container">
        <motion.div
          className="step"
          initial={{ opacity: 0, y: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FaSearch size={50} color="#e63946" />
          <h3>Pesquise um produto</h3>
          <p>Digite o nome do produto que deseja encontrar e deixe o SIMPLIFY fazer o trabalho para você.</p>
        </motion.div>

        <motion.div
          className="step"
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FaChartBar size={50} color="#e63946" />
          <h3>Compare preços automaticamente</h3>
          <p>Veja os preços em diversas lojas e descubra onde comprar pelo menor valor.</p>
        </motion.div>

        <motion.div
          className="step"
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          <FaShoppingCart size={50} color="#e63946" />
          <h3>Compre no menor valor</h3>
          <p>Escolha a melhor oferta e economize ao máximo na sua compra.</p>
        </motion.div>
      </div>

      <a href="/comparar" className="btn-primary">Começar a comparar</a>
    </div>
  );
};

export default HowWorks;
