import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export interface Produto {
  nome: string;
  /** Numeric cash price, used for sorting. */
  valor: number | null;
  preco: { avista: string; parcelado: string | null };
  loja: string;
  link: string;
  imagem: string | null;
}

interface ProdutoApi {
  nome?: string;
  valor?: number;
  preco?: { avista?: string; parcelado?: string | null };
  loja?: string;
  link?: string;
  imagem?: string | null;
}

const isHttpUrl = (value?: string | null): value is string => !!value && value.startsWith("http");

export const fetchPrices = async (produto: string): Promise<Produto[]> => {
  try {
    const response = await axios.get<ProdutoApi[]>(`${API_URL}/preco/${encodeURIComponent(produto)}`);

    return response.data.map((item) => ({
      nome: item.nome || "Produto sem nome",
      valor: typeof item.valor === "number" ? item.valor : null,
      preco: {
        avista: item.preco?.avista || "Preço não disponível",
        parcelado: item.preco?.parcelado ?? null,
      },
      loja: item.loja || "Desconhecido",
      link: isHttpUrl(item.link) ? item.link : "#", // evita links quebrados
      imagem: isHttpUrl(item.imagem) ? item.imagem : null,
    }));
  } catch (error) {
    const detail = axios.isAxiosError(error) ? error.response?.data ?? error.message : error;
    console.error("❌ Erro ao buscar preços:", detail);
    throw error;
  }
};
