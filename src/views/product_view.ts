import { IProduct } from '../models/Product';

export default {
	render(product: IProduct) {
		return {
			sku: product.sku,
			name: product.name,
			inventory: {
				warehouses: product.inventory.warehouses,
			},
		};
	},
	renderMany(products: IProduct[]) {
		return products.map((product) => this.render(product));
	},
};
