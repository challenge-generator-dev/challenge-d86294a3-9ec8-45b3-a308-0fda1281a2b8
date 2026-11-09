import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../domain/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductSqlRepository.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const existingProduct = await this.findBySku(product.sku);
    if (existingProduct) {
      throw new Error('Product with this SKU already exists');
    }
    const savedProduct = await this.productRepository.save(product);
    this.logger.log(`Product created with ID: ${savedProduct.id}`);
    return savedProduct;
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    const existingProduct = await this.findById(product.id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${product.id} not found`);
    }
    const updatedProduct = await this.productRepository.save(product);
    this.logger.log(`Product updated with ID: ${updatedProduct.id}`);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.delete(id);
    this.logger.log(`Product deleted with ID: ${id}`);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();
    this.logger.log(`Found ${products.length} products`);
    return products;
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({ where: { sku } });
  }
}