import { buscarPrecoAmazon } from "../services/amazonService.js";
import { buscarPrecoMercadoLivre } from "../services/mercadoLivreService.js";
import { buscarPrecoShopee } from "../services/shopeeScrapper.js";

export const getPreco = async (req, res) => {
    try {
        const { produto } = req.params;
        console.log(`🔍 Buscando preços para: ${produto}`);

        const [mercadoLivre, amazon, shopee] = await Promise.allSettled([
            buscarPrecoMercadoLivre(produto),
            buscarPrecoAmazon(produto),
            buscarPrecoShopee(produto) // Aqui estava pegando Amazon de novo ❌
        ]);

        const resultados = [
            ...(mercadoLivre.status === "fulfilled" ? mercadoLivre.value : []),
            ...(amazon.status === "fulfilled" ? amazon.value : []),
            ...(shopee.status === "fulfilled" ? shopee.value : []) // Correção aqui ✅
        ];

        res.json(resultados);
    } catch (error) {
        console.error("❌ Erro ao buscar preços:", error.message);
        res.status(500).json({ erro: "Erro ao buscar preços" });
    }
};

