import cloudscraper from "cloudscraper";
import * as cheerio from "cheerio";

export const buscarPrecoShopee = async (produto) => {
  try {
    console.log(`🔍 Buscando na Shopee com CloudScraper: ${produto}`);

    const url = `https://shopee.com.br/search?keyword=${encodeURIComponent(produto)}`;

    const data = await cloudscraper.get(url);
    const $ = cheerio.load(data);
    const produtos = [];

    $("div.shopee-search-item-result__item").each((index, element) => {
      const titulo = $(element).find("div[data-sqe='name']").text().trim();
      const imagem = $(element).find("img").attr("src");
      const link = $(element).find("a").attr("href");

      let precoAVista = $(element).find(".vioxXd span").first().text().trim().replace("R$", "").replace(",", ".");
      precoAVista = precoAVista ? `R$ ${precoAVista}` : "N/A";

      if (titulo && precoAVista !== "N/A") {
        produtos.push({
          nome: titulo,
          preco: { avista: precoAVista, parcelado: "" },
          loja: "Shopee",
          link: `https://shopee.com.br${link}`,
          imagem: imagem || "https://via.placeholder.com/150",
        });
      }
    });

    console.log("🛍️ Produtos da Shopee com CloudScraper:", produtos.slice(0, 5));
    return produtos.slice(0, 5);
  } catch (error) {
    console.error("❌ Erro no scraping da Shopee com CloudScraper:", error.message);
    return [];
  }
};
