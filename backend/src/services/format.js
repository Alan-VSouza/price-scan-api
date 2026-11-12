const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 1234.5 -> "R$ 1.234,50" */
export const formatBRL = (value) => brl.format(value);
