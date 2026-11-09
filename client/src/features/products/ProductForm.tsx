import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  sku: string;
}

interface Product extends ProductFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductFormProps {
  isEditMode?: boolean;
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  category: '',
  sku: ''
};

export function ProductForm({ isEditMode = false, onSuccess, onError }: ProductFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(isEditMode);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  const API_URL = 'http://localhost:3000';

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'El SKU es requerido';
    } else if (!/^[A-Z0-9-]+$/.test(formData.sku)) {
      newErrors.sku = 'El SKU debe contener solo letras mayúsculas, números y guiones';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum < 0) {
        newErrors.price = 'El precio debe ser un número positivo';
      } else if (priceNum > 999999.99) {
        newErrors.price = 'El precio no puede exceder 999999.99';
      }
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'La cantidad es requerida';
    } else {
      const quantityNum = parseInt(formData.quantity, 10);
      if (isNaN(quantityNum) || quantityNum < 0) {
        newErrors.quantity = 'La cantidad debe ser un número entero positivo';
      } else if (quantityNum > 999999) {
        newErrors.quantity = 'La cantidad no puede exceder 999999';
      }
    }

    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es requerida';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    try {
      setFetchingProduct(true);
      const response = await axios.get<Product>(`${API_URL}/products/${id}`);
      const product = response.data;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        category: product.category,
        sku: product.sku
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar el producto';
      onError?.(errorMessage);
      console.error('Error fetching product:', err);
    } finally {
      setFetchingProduct(false);
    }
  }, [id, onError]);

  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct();
    }
  }, [isEditMode, id, fetchProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        category: formData.category.trim(),
        sku: formData.sku.trim().toUpperCase()
      };

      if (isEditMode && id) {
        await axios.put(`${API_URL}/products/${id}`, payload);
        onSuccess?.('Producto actualizado correctamente');
      } else {
        await axios.post(`${API_URL}/products`, payload);
        onSuccess?.('Producto creado correctamente');
      }

      navigate('/products');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setErrors({ sku: 'Ya existe un producto con este SKU' });
        } else {
          const errorMessage = err.response?.data?.message || err.message;
          onError?.(errorMessage);
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Error al guardar el producto';
        onError?.(errorMessage);
      }
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (fetchingProduct) {
    return (
      <div className="product-form-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</h1>
        <Link to="/products" className="back-link">
          ← Volver a la lista
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="sku">
            SKU <span className="required">*</span>
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            disabled={loading || isEditMode}
            placeholder="Ej: PROD-001"
            className={errors.sku ? 'error' : ''}
          />
          {errors.sku && <span className="error-message">{errors.sku}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">
            Nombre <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Nombre del producto"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            placeholder="Descripción detallada del producto"
            rows={4}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              Precio (€) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
              placeholder="0.00"
              step="0.01"
              min="0"
              max="999999.99"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">
              Cantidad <span className="required">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              disabled={loading}
              placeholder="0"
              min="0"
              max="999999"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Categoría <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Seleccionar categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="food">Alimentación</option>
            <option value="books">Libros</option>
            <option value="home">Hogar</option>
            <option value="sports">Deportes</option>
            <option value="toys">Juguetes</option>
            <option value="other">Otros</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;