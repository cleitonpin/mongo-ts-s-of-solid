import { Schema, model, Model } from 'mongoose';

export interface IProduct {
	sku: number;
	name: string;
	inventory: {
		quantity?: number;
		warehouses: Array<{
			locality: string;
			quantity: number;
			type: string;
		}>;
	};
	isMarketable?: boolean;
}

interface IProductModel extends Model<IProduct> {
	findBySku: (sku: number) => Promise<IProduct>;
}

const ProductSchema = new Schema<IProduct, IProductModel>({
	sku: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	inventory: {
		quantity: {
			type: Number,
			required: false,
		},
		warehouses: [
			{
				_id: false,
				locality: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				type: {
					type: String,
					required: true,
				},
			},
		],
	},
	isMarketable: {
		type: Boolean,
		required: false,
	},
});

ProductSchema.static('findBySku', async function findBySku(sku: number) {
	const productBySku = await this.findOne({ sku });

	return productBySku;
});

export const Product = model<IProduct, IProductModel>('Product', ProductSchema);
