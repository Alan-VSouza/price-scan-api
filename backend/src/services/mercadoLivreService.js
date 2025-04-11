import axios from "axios";
import * as cheerio from "cheerio";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const buscarPrecoMercadoLivre = async (produto, accessToken, tentativas = 3) => {
  try {
    console.log(`🔍 Buscando no Mercado Livre: ${produto}`);
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(produto)}`;
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    const { data } = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`, 
        "User-Agent": userAgent,
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
      },
      timeout: 10000
    });

    console.log("📄 Dados recebidos do Mercado Livre:", data);  

    const produtos = data.results.map(item => ({
      nome: item.title,
      preco: {
        avista: `R$ ${item.price.toFixed(2)}`,
        parcelado: item.installments ? `10x de R$ ${(item.price / 10).toFixed(2)}` : null
      },
      loja: "Mercado Livre",
      link: item.permalink,
      imagem: item.thumbnail || "https://via.placeholder.com/150"
    }));

    console.log("📦 Produtos do Mercado Livre:", produtos.slice(0, 5)); 
    return produtos.slice(0, 50);

  } catch (error) {
    if (tentativas > 0) {
      console.warn(`⚠️ Erro ao buscar no Mercado Livre (${tentativas} tentativas restantes): ${error.message}`);
      await delay(10000);
      return buscarPrecoMercadoLivre(produto, accessToken, tentativas - 1);
    }

    console.error("❌ Erro final ao buscar no Mercado Livre:", error.message);
    return [];
  }
};
