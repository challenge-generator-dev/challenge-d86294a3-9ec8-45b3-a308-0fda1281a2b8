import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Min } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class ProductEntity {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  price: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    sku: string,
    id?: string,
  ) {
    this.id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.sku = sku;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateDetails(name: string, description: string, price: number, category: string): void {
    if (!name || !description || price <= 0 || !category) {
      throw new Error('Invalid product details');
    }
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.updatedAt = new Date();
  }

  adjustStock(quantity: number): void {
    if (this.stock + quantity < 0) {
      throw new Error('Insufficient stock');
    }
    this.stock += quantity;
    this.updatedAt = new Date();
  }

  validate(): boolean {
    return (
      !!this.name &&
      !!this.description &&
      this.price > 0 &&
      this.stock >= 0 &&
      !!this.category &&
      !!this.sku
    );
  }
}