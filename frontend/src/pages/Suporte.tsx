import React from "react";

const Suporte: React.FC = () => {
  return (
    <div className="suporte">
      <h1>Central de Suporte</h1>
      <p>Precisa de ajuda? Envie sua dúvida ou problema no formulário abaixo.</p>

      <form className="suporte-form">
        <input type="text" placeholder="Seu Nome" required />
        <input type="email" placeholder="Seu E-mail" required />
        <textarea placeholder="Descreva seu problema..." required></textarea>
        <button type="submit">Enviar</button>
      </form>

      <h2>Outros canais de suporte</h2>
      <p>
        📧 E-mail: simplifysuporte@gmail.com <br />
        📞 Telefone: (19) 99445-0160<br />
      </p>
    </div>
  );
};

export default Suporte;
