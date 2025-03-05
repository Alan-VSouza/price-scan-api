import React from "react";
import { motion } from "framer-motion";

const Sobre: React.FC = () => {
  return (
    <motion.div
      className="sobre"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h1>Sobre o SIMPLIFY</h1>
      <p>
        O <strong>SIMPLIFY</strong> é uma plataforma que compara preços automaticamente, 
        ajudando você a economizar sem precisar pesquisar manualmente.
      </p>
      <h2>Nossa Missão</h2>
      <p>Facilitar suas compras garantindo sempre o menor preço!</p>
    </motion.div>
  );
};

export default Sobre;
