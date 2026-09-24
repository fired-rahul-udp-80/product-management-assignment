import apiClient from '@/lib/axios';
export const productService = {
  // Fetch paginated products with optional sort & limit/skip parameters
  getProducts: async ({ limit = 10, skip = 0, sortBy = '', order = 'asc' } = {}) => {
    const params = { limit, skip };
    if (sortBy) {
      params.sortBy = sortBy;
      params.order = order;
    }
    const response = await apiClient.get('/products', { params });
    console.log("product", response)
    return response.data;
  },

  // Search products by query string
  searchProducts: async ({ q = '', limit = 10, skip = 0, sortBy = '', order = 'asc' } = {}) => {
    const params = { q, limit, skip };
    if (sortBy) {
      params.sortBy = sortBy;
      params.order = order;
    }
    const response = await apiClient.get('/products/search', { params });
    return response.data;
  },

  // Fetch all product categories
  getCategories: async () => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },

  // Fetch products by category slug
  getProductsByCategory: async (categorySlug, { limit = 10, skip = 0, sortBy = '', order = 'asc' } = {}) => {
    const params = { limit, skip };
    if (sortBy) {
      params.sortBy = sortBy;
      params.order = order;
    }
    const response = await apiClient.get(`/products/category/${categorySlug}`, { params });
    return response.data;
  },

  // Fetch single product details by ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Add a new product
  addProduct: async (productData) => {
    const response = await apiClient.post('/products/add', productData);
    return response.data;
  },

  // Update existing product by ID
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product by ID
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};
