import { buscarPrecoAmazon } from "../services/amazonService.js";
import { buscarPrecoMercadoLivre } from "../services/mercadoLivreService.js";

export const getPreco = async (req, res) => {
  try {
    const { produto } = req.params;
    console.log(`🔍 Buscando preços para: ${produto}`);

    const [mercadoLivre, amazon] = await Promise.allSettled([
      buscarPrecoMercadoLivre(produto, process.env.ML_ACCESS_TOKEN),
      buscarPrecoAmazon(produto),
    ]);

    const resultados = [
      ...(mercadoLivre.status === "fulfilled" ? mercadoLivre.value : []),
      ...(amazon.status === "fulfilled" ? amazon.value : []),
    ];

    if (mercadoLivre.status === "rejected") {
      console.error("❌ Erro ao buscar preços no Mercado Livre:", mercadoLivre.reason);
    }
    if (amazon.status === "rejected") {
      console.error("❌ Erro ao buscar preços na Amazon:", amazon.reason);
    }

    res.json(resultados);
  } catch (error) {
    console.error("❌ Erro ao buscar preços:", error.message);
    res.status(500).json({ erro: "Erro ao buscar preços" });
  }
};
