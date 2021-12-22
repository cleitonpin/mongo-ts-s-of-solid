import { Router } from 'express';

import { ProductRepository } from './repositories/ProductRepository';
import { CreateProductService } from './service/CreateProductService';
import { UpdateProductService } from './service/UpdateProductService';

const routes = Router();

const productRepository = new ProductRepository();

routes.post('/product', async (req, res) => {
	const product = new CreateProductService(productRepository);

	const created = await product.execute(req.body);

	return res.json(created);
});

routes.put('/product/:id', async (req, res) => {
	const product = new UpdateProductService(productRepository);

	const updated = await product.execute(req.body, req.params.id);

	return res.json(updated);
});

routes.get('/product/:sku', async (req, res) => {
	const { sku } = req.params;
	const product = await productRepository.findBySku(Number(sku));

	return res.json(product);
});

routes.delete('/product/:sku', async (req, res) => {
	const { sku } = req.params;
	await productRepository.delete(Number(sku));

	return res.sendStatus(204);
});

export { routes };
