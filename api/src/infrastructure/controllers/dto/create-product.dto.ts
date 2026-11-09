import { IsString, IsNumber, IsNotEmpty, Min, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'SKU-001',
    description: 'Código único de identificación del producto',
    type: String,
  })
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El SKU es obligatorio' })
  @MaxLength(50, { message: 'El SKU no puede exceder 50 caracteres' })
  sku: string;

  @ApiProperty({
    example: 'Laptop Dell XPS 15',
    description: 'Nombre del producto',
    type: String,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  name: string;

  @ApiPropertyOptional({
    example: 'Laptop de alta gama con procesador Intel Core i7',
    description: 'Descripción detallada del producto',
    type: String,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(1000, { message: 'La descripción no puede exceder 1000 caracteres' })
  description?: string;

  @ApiProperty({
    example: 1299.99,
    description: 'Precio del producto en la moneda base',
    type: Number,
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @Max(999999.99, { message: 'El precio excede el límite permitido' })
  price: number;

  @ApiProperty({
    example: 'Electrónica',
    description: 'Categoría a la que pertenece el producto',
    type: String,
  })
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @MaxLength(100, { message: 'La categoría no puede exceder 100 caracteres' })
  category: string;

  @ApiProperty({
    example: 50,
    description: 'Cantidad disponible en inventario',
    type: Number,
  })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @Max(999999, { message: 'El stock excede el límite permitido' })
  stock: number;
}