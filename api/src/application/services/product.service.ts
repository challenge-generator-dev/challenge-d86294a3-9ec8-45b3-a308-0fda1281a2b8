import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    sku: string;
    stock: number;
  }): Promise<ProductEntity> {
    const existingProduct = await this.productRepository.findBySku(data.sku);
    if (existingProduct) {
      throw new ConflictException(`Product with SKU ${data.sku} already exists`);
    }

    const product = new ProductEntity(
      data.name,
      data.description,
      data.price,
      data.category,
      data.sku,
      data.stock,
    );

    if (!product.validate()) {
      throw new ConflictException('Invalid product data');
    }

    return this.productRepository.create(product);
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      category?: string;
      stock?: number;
    },
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (data.name !== undefined || data.description !== undefined || data.price !== undefined || data.category !== undefined) {
      product.updateDetails(
        data.name ?? product.name,
        data.description ?? product.description,
        data.price ?? product.price,
        data.category ?? product.category,
      );
    }

    if (data.stock !== undefined) {
      product.adjustStock(data.stock);
    }

    if (!product.validate()) {
      throw new ConflictException('Invalid product data after update');
    }

    return this.productRepository.update(product);
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepository.delete(id);
  }
}