import React from "react";
import type { Produto } from "../api/FetchPrices";

// Inline placeholder (the old via.placeholder.com service is offline).
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#6b7280" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">Sem imagem</text></svg>'
  );

const ProductCard: React.FC<Produto> = ({ nome, preco, loja, link, imagem }) => {
  return (
    <div className="product-card">
      <img
        src={imagem ?? PLACEHOLDER}
        alt={nome}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER;
        }}
      />
      <h3>{nome}</h3>
      <p className="loja">{loja}</p>

      <div className="precos">
        <p className="preco-avista"><strong>À vista:</strong> {preco.avista}</p>
        {preco.parcelado && <p className="preco-parcelado"><strong>Parcelado:</strong> {preco.parcelado}</p>}
      </div>

      <a href={link} target="_blank" rel="noopener noreferrer">Ver Produto</a>
    </div>
  );
};

export default ProductCard;
