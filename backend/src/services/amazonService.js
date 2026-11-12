import axios from "axios";
import * as cheerio from "cheerio";
import { formatBRL } from "./format.js";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const buscarPrecoAmazon = async (produto, tentativas = 3) => {
  try {
    console.log(`🔍 Buscando na Amazon: ${produto}`);
    const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(produto)}`;
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": userAgent,
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
      },
      timeout: 10000
    });

    const $ = cheerio.load(data);
    const produtos = [];

    $(".s-main-slot .s-result-item").each((index, element) => {
      const titulo = $(element).find("h2 span").text().trim();
      let link = $(element).find("h2 a").attr("href");
      const imagem = $(element).find(".s-image").attr("src");

      if (link && !link.startsWith("http")) {
        link = `https://www.amazon.com.br${link}`;
      }

      const whole = $(element).find("span.a-price-whole").first().text().trim();
      const fraction = $(element).find("span.a-price-fraction").first().text().trim();
      let precoAVista = null;
      if (whole) {
        const priceStr = whole.replace(/\./g, "") + "." + (fraction || "00");
        precoAVista = parseFloat(priceStr);
      }

      // The second price on a result card is usually the crossed-out list price, not an
      // installment plan, so no installment value is shown for Amazon.
      if (titulo && precoAVista !== null && !Number.isNaN(precoAVista)) {
        produtos.push({
          nome: titulo,
          valor: precoAVista,
          preco: { avista: formatBRL(precoAVista), parcelado: null },
          loja: "Amazon",
          link: link || "#",
          imagem: imagem || null
        });
      }
    });

    console.log(`📦 Amazon: ${produtos.length} produtos`);
    return produtos.slice(0, 50);
  } catch (error) {
    if (error.response && error.response.status === 503 && tentativas > 0) {
      console.warn(`⚠️ Amazon retornou 503. Tentando novamente (${tentativas} tentativas restantes)...`);
      await delay(10000);
      return buscarPrecoAmazon(produto, tentativas - 1);
    }

    console.error("❌ Erro no scraping da Amazon:", error.message);
    return [];
  }
};
