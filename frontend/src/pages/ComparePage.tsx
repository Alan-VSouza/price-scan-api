import React, { useState, useEffect } from "react";
import ProductCard from "@components/ProductCard";
import { fetchPrices } from "../api/FetchPrices";
import "../styles/compare.css";

const ITEMS_PER_PAGE = 30;

const ComparePage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storeFilter, setStoreFilter] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    let filtered = produtos;

    // 🔍 Filtrar por loja
    if (storeFilter !== "Todas") {
      filtered = filtered.filter((produto) => produto.loja === storeFilter);
    }

    // 🔽 Ordenação de preços
    if (sortOrder === "menor") {
      filtered = filtered.sort((a, b) => parseFloat(a.preco.avista.replace("R$", "").replace(",", ".")) - parseFloat(b.preco.avista.replace("R$", "").replace(",", ".")));
    } else if (sortOrder === "maior") {
      filtered = filtered.sort((a, b) => parseFloat(b.preco.avista.replace("R$", "").replace(",", ".")) - parseFloat(a.preco.avista.replace("R$", "").replace(",", ".")));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetar para primeira página ao filtrar
  }, [produtos, storeFilter, sortOrder]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const resultados = await fetchPrices(query);

    if (resultados.length === 0) {
      setError("Nenhum produto encontrado para essa busca.");
    }

    // 🔄 Limita a 200 produtos
    setProdutos(resultados.slice(0, 200));
    setLoading(false);
  };

  // 🏷️ Paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="compare-page">
      <h1>Compare os Melhores Preços</h1>
      <p>Pesquise, filtre e encontre a melhor oferta.</p>

      {/* 🔎 Barra de Pesquisa */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input 
          type="text"
          placeholder="Digite o nome do produto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>

      {/* 🏪 Filtros e Ordenação */}
      <div className="filters">
        <select value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}>
          <option value="Todas">Todas as Lojas</option>
          <option value="Amazon">Amazon</option>
          <option value="Kabum">Kabum</option>
          <option value="Mercado Livre">Mercado Livre</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">Ordenar Preço</option>
          <option value="menor">Menor para Maior</option>
          <option value="maior">Maior para Menor</option>
        </select>
      </div>

      {loading && <p className="loading">🔄 Buscando produtos...</p>}
      {error && <p className="error">{error}</p>}

      {/* 📦 Exibição dos produtos */}
      <div className="product-grid">
        {displayedProducts.map((produto, index) => (
          <ProductCard key={index} {...produto} />
        ))}
      </div>

      {/* 📌 Paginação */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅️ Anterior
          </button>
          
          <span>Página {currentPage} de {totalPages}</span>

          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
