import React, { useState, useEffect } from "react";
import { fetchPrices } from "../api/FetchPrices";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";// 🔥 Importe o arquivo de estilos

const Home: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    buscarProdutos("celular"); // Produtos populares ao carregar
  }, []);

  const buscarProdutos = async (produto: string) => {
    if (!produto.trim()) return; // Evitar busca vazia
    const resultados = await fetchPrices(produto);
    setProdutos(resultados);
  };

  return (
    <div className="home-container">
      <h1>📊 Comparador de Preços</h1>
      <div className="search-box">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Digite um produto..."
        />
        <button onClick={() => buscarProdutos(busca)}>Buscar</button>
      </div>

      <div className="products-grid">
        {produtos.length > 0 ? (
          produtos.map((produto, index) => (
            <ProductCard key={index} {...produto} />
          ))
        ) : (
          <p className="no-results">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
