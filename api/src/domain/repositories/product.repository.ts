import { ProductEntity } from '../product.entity';

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  update(product: ProductEntity): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  findAll(): Promise<ProductEntity[]>;
  findBySku(sku: string): Promise<ProductEntity | null>;
}