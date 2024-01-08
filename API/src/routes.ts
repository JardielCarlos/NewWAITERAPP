import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { ChangeOrderStatus } from './app/useCases/orders/ChangeOrderStatus';
import { CancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

// Listar categorias
router.get('/categories', listCategories);

// Criar Categorias
router.post('/categories', createCategory);

// Listar Produtos
router.get('/products', listProducts);

// Criar produtos
router.post('/products', upload.single('image'), createProduct);

// listar produtos pela categoria
router.get('/categories/:categoryId/products', listProductsByCategory);

// Listar ordens
router.get('/orders', listOrders);

// Criar ordens
router.post('/orders', createOrder);

// Trocar o status da ordem
router.patch('/orders/:orderId', ChangeOrderStatus);

// Deletar/cancelar a ordem
router.delete('/orders/:orderId', CancelOrder);
