import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchPrices = async (produto: string) => {
  try {
    const response = await axios.get(`${API_URL}/preco/${produto}`);

    console.log("📦 Produtos recebidos no frontend:", response.data); // Log para depuração

    return response.data.map((item: any) => ({
      nome: item.nome || "Produto sem nome",
      preco: item.preco || "Preço não disponível",
      loja: item.loja || "Desconhecido",
      link: item.link.startsWith("http") ? item.link : `https://www.amazon.com.br${item.link}`,
      imagem: item.imagem || "https://via.placeholder.com/150"
    }));
  } catch (error: any) {
    console.error("❌ Erro ao buscar preços:", error.response ? error.response.data : error.message);
    return [];
  }
};
