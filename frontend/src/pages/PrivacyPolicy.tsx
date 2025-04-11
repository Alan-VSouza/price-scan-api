import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy: React.FC = () => {
  return (
    <motion.div
      className="privacidade"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h1>Política de Privacidade</h1>
      <p>
        A sua privacidade é importante para nós. É política do Simplify Code respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Simplify Code, e outros sites que possuímos e operamos.
      </p>

      <h2>Coleta de Informações</h2>
      <p>
        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
      </p>

      <h2>Retenção de Dados</h2>
      <p>
        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
      </p>

      <h2>Compartilhamento de Dados</h2>
      <p>
        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
      </p>

      <h2>Links Externos</h2>
      <p>
        O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
      </p>

      <h2>Recusa de Solicitação</h2>
      <p>
        Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
      </p>

      <h2>Compromisso do Usuário</h2>
      <p>
        O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Simplify Code oferece no site e com caráter enunciativo, mas não limitativo:
      </p>
      <ul>
        <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
        <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
        <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Simplify Code, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
      </ul>

      <h2>Mais Informações</h2>
      <p>
        Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
      </p>
      <p>
        Esta política é efetiva a partir de 11 Abril 2025 12:29.
      </p>
    </motion.div>
  );
};

export default PrivacyPolicy;
