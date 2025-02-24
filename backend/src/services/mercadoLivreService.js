import axios from "axios";

export const buscarPrecoMercadoLivre = async (produto) => {
    try {
        console.log(`🔍 Buscando no Mercado Livre: ${produto}`);
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);

        return response.data.results.slice(0, 5).map(item => {
            const precoAVista = item.price ? `R$ ${item.price.toFixed(2)}` : "N/A";
            const precoParcelado = item.installments
                ? `${item.installments.quantity}x de R$ ${item.installments.amount.toFixed(2)}`
                : "";

            // 🔥 Melhorando a qualidade da imagem
            const imagemAltaQualidade = item.thumbnail.replace("I.jpg", "O.jpg");

            return {
                nome: item.title,
                preco: { avista: precoAVista, parcelado: precoParcelado },
                loja: "Mercado Livre",
                link: item.permalink,
                imagem: imagemAltaQualidade
            };
        });
    } catch (error) {
        console.error("❌ Erro no Mercado Livre:", error.message);
        return [];
    }
};
