import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const emailParams = {
      from_name: formData.nome,
      from_email: formData.email,
      message: formData.mensagem,
    };

    emailjs
      .send(
        "service_g9rrnkk", // Service ID
        "template_nlqur4n", // Novo Template ID
        emailParams,
        "WpcaIgP0jErDO7S7W" // Public Key
      )
      .then(() => {
        setMessage("✅ E-mail enviado com sucesso!");
        setFormData({ nome: "", email: "", mensagem: "" });
      })
      .catch(() => setMessage("❌ Erro ao enviar e-mail. Tente novamente."))
      .finally(() => setLoading(false));
  };

  return (
    <motion.div 
      className="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <h2>Entre em Contato</h2>
      <p>Tem dúvidas ou sugestões? Fale conosco!</p>

      <form className="contact-form" onSubmit={sendEmail}>
        <input
          type="text"
          name="nome"
          placeholder="Seu Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensagem"
          placeholder="Digite sua mensagem..."
          value={formData.mensagem}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </motion.div>
  );
};

export default Contact;
