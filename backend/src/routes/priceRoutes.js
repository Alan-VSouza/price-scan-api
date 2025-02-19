import express from "express";
import { getPreco } from "../controllers/priceController.js";

const router = express.Router();

router.get("/preco/:produto", getPreco);

export default router;
