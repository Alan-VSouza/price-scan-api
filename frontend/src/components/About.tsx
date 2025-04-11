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
          Sobre o <strong>Simplify</strong>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          O <strong>Simplify</strong> é o seu novo hub de aplicativos. Nossa plataforma reúne as melhores soluções digitais em um só lugar, proporcionando uma experiência mais eficiente, simplificada e organizada.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Aqui, você pode acessar uma seleção de aplicativos e ferramentas úteis que tornam sua vida mais prática, sem perder tempo buscando em diversos sites. Tudo o que você precisa, agora no <strong>Simplify</strong>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Explore, descubra e organize seus aplicativos favoritos de forma intuitiva com o <strong>Simplify</strong> – o seu hub digital para produtividade e diversão.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default About;
