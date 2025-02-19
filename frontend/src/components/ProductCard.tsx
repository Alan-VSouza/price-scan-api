import React from "react";
import "../styles/ProductCard.css";

interface ProductProps {
  nome: string;
  preco: { avista: string; parcelado: string };
  loja: string;
  link: string;
  imagem: string;
}

const ProductCard: React.FC<ProductProps> = ({ nome, preco, loja, link, imagem }) => {
  return (
    <div className="product-card">
      <img src={imagem} alt={nome} />
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
