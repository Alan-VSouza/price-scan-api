import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <motion.div 
      className="about"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="about-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Sobre o <strong>SIMPLIFY</strong>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          O <strong>SIMPLIFY</strong> é a maneira mais inteligente de economizar! 
          Nosso sistema compara preços de diversas lojas para garantir que você sempre compre pelo menor valor, 
          sem precisar pesquisar manualmente.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Não perca tempo visitando vários sites. Deixe o <strong>SIMPLIFY</strong> encontrar as melhores ofertas para você!
        </motion.p>
      </div>
    </motion.div>
  );
};

export default About;
