import { IsString, IsNumber, IsOptional, Min, MaxLength, MinLength, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'SKU-001-UPDATED',
    description: 'Código único de identificación del producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El SKU no puede exceder 50 caracteres' })
  sku?: string;

  @ApiPropertyOptional({
    example: 'Laptop Dell XPS 15 Pro',
    description: 'Nombre del producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(1, { message: 'El nombre no puede estar vacío' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    example: 'Laptop de alta gama con procesador Intel Core i9 y 32GB RAM',
    description: 'Descripción detallada del producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(1000, { message: 'La descripción no puede exceder 1000 caracteres' })
  description?: string;

  @ApiPropertyOptional({
    example: 1499.99,
    description: 'Precio del producto en la moneda base',
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @Max(999999.99, { message: 'El precio excede el límite permitido' })
  price?: number;

  @ApiPropertyOptional({
    example: 'Computación',
    description: 'Categoría a la que pertenece el producto',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La categoría no puede exceder 100 caracteres' })
  category?: string;

  @ApiPropertyOptional({
    example: 75,
    description: 'Cantidad disponible en inventario',
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @Max(999999, { message: 'El stock excede el límite permitido' })
  stock?: number;
}