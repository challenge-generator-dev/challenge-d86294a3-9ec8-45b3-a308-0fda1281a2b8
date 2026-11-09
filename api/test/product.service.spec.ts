import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ProductService, PRODUCT_REPOSITORY } from '../src/application/services/product.service';
import { ProductEntity } from '../src/domain/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let mockRepository: {
    create: jest.Mock;
    findById: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findAll: jest.Mock;
    findBySku: jest.Mock;
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findBySku: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  describe('create', () => {
    it('debería crear un producto exitosamente', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Electronics',
        sku: 'TEST-001',
        stock: 10,
      };

      const mockProduct = new ProductEntity(
        productData.name,
        productData.description,
        productData.price,
        productData.category,
        productData.sku,
        productData.stock,
      );

      mockRepository.findBySku.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(mockProduct);

      const result = await service.create(productData);

      expect(mockRepository.findBySku).toHaveBeenCalledWith(productData.sku);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockProduct);
    });

    it('debería lanzar ConflictException si el SKU ya existe', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Electronics',
        sku: 'TEST-001',
        stock: 10,
      };

      const existingProduct = new ProductEntity(
        productData.name,
        productData.description,
        productData.price,
        productData.category,
        productData.sku,
        productData.stock,
      );

      mockRepository.findBySku.mockResolvedValue(existingProduct);

      await expect(service.create(productData)).rejects.toThrow(ConflictException);
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('debería retornar un producto por ID', async () => {
      const mockProduct = new ProductEntity(
        'Test Product',
        'Description',
        100,
        'Electronics',
        'TEST-001',
        10,
      );

      mockRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.findById('123');

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockProduct);
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los productos', async () => {
      const mockProducts = [
        new ProductEntity('Product 1', 'Desc 1', 100, 'Cat1', 'SKU-1', 10),
        new ProductEntity('Product 2', 'Desc 2', 200, 'Cat2', 'SKU-2', 20),
      ];

      mockRepository.findAll.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('update', () => {
    it('debería actualizar un producto exitosamente', async () => {
      const existingProduct = new ProductEntity(
        'Old Name',
        'Old Description',
        100,
        'Old Category',
        'TEST-001',
        10,
      );

      const updatedProduct = new ProductEntity(
        'New Name',
        'New Description',
        150,
        'New Category',
        'TEST-001',
        20,
      );

      mockRepository.findById.mockResolvedValue(existingProduct);
      mockRepository.update.mockResolvedValue(updatedProduct);

      const result = await service.update('123', {
        name: 'New Name',
        description: 'New Description',
        price: 150,
        category: 'New Category',
        stock: 20,
      });

      expect(mockRepository.update).toHaveBeenCalled();
      expect(result).toEqual(updatedProduct);
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        service.update('nonexistent-id', { name: 'New Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('debería eliminar un producto exitosamente', async () => {
      const mockProduct = new ProductEntity(
        'Test Product',
        'Description',
        100,
        'Electronics',
        'TEST-001',
        10,
      );

      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.delete.mockResolvedValue(undefined);

      await service.delete('123');

      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.delete('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });
});