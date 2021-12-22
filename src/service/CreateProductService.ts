import { IProduct } from "../models/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export interface IRequest {
	sku: number;
	name: string;
	inventory: {
		warehouses: Array<{
			locality: string;
			quantity: number;
			type: string;
		}>;
	};
}

class CreateProductService {
	constructor(private productRepository: ProductRepository) { }

	async execute({ inventory, sku, name }: IRequest): Promise<IProduct> {
		const productAlreadyExistsBySku = this.productRepository.findBySku(sku);

		if (productAlreadyExistsBySku) {
			throw new Error("Product with this sku already exists!");
		}

		const product = await this.productRepository.create({
			inventory,
			sku,
			name,
		});

		return product;
	}
}

export { CreateProductService };
