import axios from "axios";
import * as cheerio from "cheerio";

export const buscarPrecoAmazon = async (produto) => {
  try {
    console.log(`🔍 Buscando na Amazon: ${produto}`);

    const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(produto)}`;
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const produtos = [];

    $(".s-main-slot .s-result-item").each((index, element) => {
      const titulo = $(element).find("h2 span").text().trim();
      const link = $(element).find("h2 a").attr("href");
      const imagem = $(element).find(".s-image").attr("src");

      // 🔥 Capturar todos os preços (à vista e parcelado)
      let precos = $(element)
        .find(".a-price .a-offscreen")
        .map((_, el) => $(el).text().trim().replace("R$", "").replace(",", "."))
        .get();

      precos = [...new Set(precos)]; // Remove preços duplicados

      // Separar preço à vista e parcelado, se disponíveis
      let precoAVista = precos.length > 0 ? `R$ ${precos[0]}` : "N/A";
      let precoParcelado = precos.length > 1 ? `${precos[1]} no total` : "";

      // 🔄 Se não houver preço parcelado explícito, calcular 10x sem juros
      if (!precoParcelado && precoAVista !== "N/A") {
        const precoNumero = parseFloat(precos[0]);
        if (!isNaN(precoNumero)) {
          precoParcelado = `10x de R$ ${(precoNumero / 10).toFixed(2)}`;
        }
      }

      if (titulo && precoAVista !== "N/A") {
        produtos.push({
          nome: titulo,
          preco: { avista: precoAVista, parcelado: precoParcelado },
          loja: "Amazon",
          link: link ? `https://www.amazon.com.br${link}` : "#",
          imagem: imagem || "https://via.placeholder.com/150",
        });
      }
    });

    console.log("📦 Produtos da Amazon:", produtos.slice(0, 5));
    return produtos.slice(0, 5);
  } catch (error) {
    console.error("❌ Erro no scraping da Amazon:", error.message);
    return [];
  }
};

// Exemplo de uso
buscarPrecoAmazon("iphone").then(console.log);
