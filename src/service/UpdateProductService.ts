import { IProduct } from '../models/Product';
import { ProductRepository } from '../repositories/ProductRepository';
import { IRequest } from './CreateProductService';

class UpdateProductService {
	constructor(private productRepository: ProductRepository) { }

	async execute(request: IRequest, id: string): Promise<IProduct> {
		const product = await this.productRepository.put(request, id);

		return product;
	}
}

export { UpdateProductService };
