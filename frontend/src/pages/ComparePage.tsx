import React, { useState, useEffect } from "react";
import ProductCard from "@components/ProductCard";
import { fetchPrices, Produto } from "../api/FetchPrices";
import "../styles/compare.css";

const ITEMS_PER_PAGE = 30;

type SortOrder = "none" | "menor" | "maior";

const ComparePage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Produto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storeFilter, setStoreFilter] = useState("Todas");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const resultados = await fetchPrices(query);
      if (resultados.length === 0) {
        setError("Nenhum produto encontrado para essa busca.");
      }
      setProdutos(resultados.slice(0, 200));
    } catch {
      setError("Erro ao buscar produtos. Verifique se a API está rodando.");
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  // Store filter and sorting run on the results already loaded: no new request.
  useEffect(() => {
    const filtered = storeFilter === "Todas" ? [...produtos] : produtos.filter((produto) => produto.loja === storeFilter);
    if (sortOrder !== "none") {
      const direction = sortOrder === "menor" ? 1 : -1;
      // Items without a price always go to the end.
      filtered.sort((a, b) => {
        if (a.valor === null) return 1;
        if (b.valor === null) return -1;
        return (a.valor - b.valor) * direction;
      });
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [produtos, storeFilter, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="compare-page">
      <div className="home-compare">
        <div className="hero-compare">
          <div className="hero-title">
            <h1>
              Bem-vindo ao <strong>SIMPLIFY-Comparator</strong>
            </h1>
          </div>
          <p>
            Pesquise, filtre e encontre a melhor oferta.
          </p>
          <a href="#search-form" className="btn-primary">Pesquisar</a>
        </div>
      </div>

      <div className="search-section">
        <h1>Pesquisar produtos</h1>
        <form className="search-bar" onSubmit={handleSearch} id="search-form">
          <input
            type="text"
            placeholder="Digite o nome do produto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit">Buscar</button>
        </form>

        <div className="filters">
          <select value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}>
            <option value="Todas">Todas as Lojas</option>
            <option value="Amazon">Amazon</option>
            <option value="Mercado Livre">Mercado Livre</option>
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)}>
            <option value="none">Ordenar Preço</option>
            <option value="menor">Menor para Maior</option>
            <option value="maior">Maior para Menor</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="loading">
          Buscando produtos...
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {displayedProducts.map((produto) => (
          <ProductCard key={`${produto.loja}-${produto.link}-${produto.nome}`} {...produto} />
        ))}
      </div>

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
