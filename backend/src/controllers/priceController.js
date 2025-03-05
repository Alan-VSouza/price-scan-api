import { buscarPrecoAmazon } from "../services/amazonService.js";
import { buscarPrecoMercadoLivre } from "../services/mercadoLivreService.js";
import { buscarPrecoShopee } from "../services/shopeeScrapper.js";

export const getPreco = async (req, res) => {
    try {
        const { produto } = req.params;
        console.log(`🔍 Buscando preços para: ${produto}`);

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Transfer-Encoding", "chunked"); // Ativa o streaming
        res.write("[");

        const sources = [
            buscarPrecoMercadoLivre(produto),
            buscarPrecoAmazon(produto),
            buscarPrecoShopee(produto),
        ];

        let firstItem = true;

        for (const source of sources) {
            try {
                const produtos = await source;
                for (const produto of produtos) {
                    if (!firstItem) res.write(",");
                    res.write(JSON.stringify(produto));
                    firstItem = false;
                }
            } catch (err) {
                console.error("❌ Erro ao buscar preços:", err.message);
            }
        }

        res.write("]");
        res.end();
    } catch (error) {
        console.error("❌ Erro ao buscar preços:", error.message);
        res.status(500).json({ erro: "Erro ao buscar preços" });
    }
};
