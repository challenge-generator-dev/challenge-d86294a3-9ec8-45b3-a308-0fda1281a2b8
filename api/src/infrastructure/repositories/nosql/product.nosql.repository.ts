import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Document } from 'mongoose';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/product.entity';

// Interfaz que extiende Document de Mongoose para el esquema de productos
interface ProductDocument extends Document {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductNoSqlRepository implements ProductRepository, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ProductNoSqlRepository.name);
  private productModel: Model<ProductDocument>;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.logger.log('ProductNoSqlRepository inicializado con conexión a MongoDB');
  }

  async onModuleInit(): Promise<void> {
    try {
      this.productModel = this.connection.model<ProductDocument>('Product');
      this.logger.log('Modelo de producto registrado en Mongoose');
    } catch (error) {
      this.logger.error('Error al inicializar el modelo de producto', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Cerrando conexión de MongoDB');
    await this.connection.close();
  }

  private mapDocumentToEntity(doc: ProductDocument): ProductEntity {
    const entity = new ProductEntity(
      doc.sku,
      doc.name,
      doc.description,
      doc.price,
      doc.category,
      doc.stock,
    );
    entity.updateDetails(doc.name, doc.description, doc.price, doc.category);
    return entity;
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingProduct = await this.findBySku(product.sku);
      if (existingProduct) {
        throw new Error(`Ya existe un producto con el SKU: ${product.sku}`);
      }

      const productData = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdProduct = new this.productModel(productData);
      const savedProduct = await createdProduct.save();
      this.logger.log(`Producto creado exitosamente con ID: ${savedProduct._id}`);

      return this.mapDocumentToEntity(savedProduct);
    } catch (error) {
      this.logger.error(`Error al crear producto: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        this.logger.warn(`Producto no encontrado con ID: ${id}`);
        return null;
      }
      return this.mapDocumentToEntity(product);
    } catch (error) {
      this.logger.error(`Error al buscar producto por ID: ${error.message}`, error.stack);
      if (error.name === 'CastError') {
        return null;
      }
      throw error;
    }
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingProduct = await this.findById(product.id);
      if (!existingProduct) {
        throw new Error(`Producto no encontrado con ID: ${product.id}`);
      }

      const skuChanged = existingProduct.sku !== product.sku;
      if (skuChanged) {
        const productWithNewSku = await this.findBySku(product.sku);
        if (productWithNewSku && productWithNewSku.id !== product.id) {
          throw new Error(`Ya existe un producto con el SKU: ${product.sku}`);
        }
      }

      const updatedProduct = await this.productModel
        .findByIdAndUpdate(
          product.id,
          {
            $set: {
              sku: product.sku,
              name: product.name,
              description: product.description,
              price: product.price,
              category: product.category,
              stock: product.stock,
              updatedAt: new Date(),
            },
          },
          { new: true },
        )
        .exec();

      if (!updatedProduct) {
        throw new Error(`Error al actualizar el producto con ID: ${product.id}`);
      }

      this.logger.log(`Producto actualizado exitosamente con ID: ${updatedProduct._id}`);
      return this.mapDocumentToEntity(updatedProduct);
    } catch (error) {
      this.logger.error(`Error al actualizar producto: ${error.message}`, error.stack);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.productModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new Error(`Producto no encontrado con ID: ${id}`);
      }
      this.logger.log(`Producto eliminado exitosamente con ID: ${id}`);
    } catch (error) {
      this.logger.error(`Error al eliminar producto: ${error.message}`, error.stack);
      if (error.message.includes('no encontrado')) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw new Error(`Producto no encontrado con ID: ${id}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await this.productModel.find().sort({ createdAt: -1 }).exec();
      this.logger.log(`Se encontraron ${products.length} productos`);
      return products.map((doc) => this.mapDocumentToEntity(doc));
    } catch (error) {
      this.logger.error(`Error al listar productos: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    try {
      const product = await this.productModel.findOne({ sku }).exec();
      if (!product) {
        return null;
      }
      return this.mapDocumentToEntity(product);
    } catch (error) {
      this.logger.error(`Error al buscar producto por SKU: ${error.message}`, error.stack);
      throw error;
    }
  }
}