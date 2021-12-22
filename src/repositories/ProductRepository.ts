/* eslint-disable class-methods-use-this */
import { HydratedDocument } from 'mongoose';

import { IProduct, Product } from '../models/Product';
import product_view from '../views/product_view';

interface ICreateProductDTO {
	sku: number;
	name: string;
	inventory: {
		quantity?: number;
		warehouses: Array<{
			locality: string;
			quantity?: number;
			type: string;
		}>;
	};
	isMarketable?: boolean;
}

class ProductRepository {
	async create({ sku, name, inventory, isMarketable }: ICreateProductDTO) {
		const product: HydratedDocument<IProduct> = new Product({
			sku,
			name,
			inventory,
			isMarketable,
		});

		await product.save();

		return product_view.render(product);
	}

	async put(product: ICreateProductDTO, _id: string) {
		try {
			await Product.updateOne({ _id }, product);

			const productUpdated = await Product.findOne({ _id });

			return product_view.render(productUpdated);
		} catch (err) {
			return err;
		}
	}

	async findBySku(sku: number) {
		try {
			const product = await Product.findBySku(sku);

			const quantity = product.inventory.warehouses.reduce<number>(
				(a, b) => a + b.quantity,
				0
			);
			const isMarketable = quantity > 0;

			return {
				sku: product.sku,
				name: product.name,
				inventory: {
					quantity,
					warehouses: product.inventory.warehouses,
				},
				isMarketable,
			};
		} catch (error) {
			return error;
		}
	}

	async delete(sku: number) {
		try {
			await Product.deleteOne({ sku });

			return {};
		} catch (error) {
			return error;
		}
	}
}

export { ProductRepository };
