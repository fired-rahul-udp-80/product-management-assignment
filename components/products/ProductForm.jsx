'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  thumbnail: '',
};
export default function ProductForm({
  mode = 'create',
  initialData = null,
  onSubmit,
  isSubmitting = false,
  cancelHref = '/products',
}) {
  const router = useRouter();
  const isEditing = mode === 'edit';

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  // When initialData changes (edit mode: product loaded), populate the form
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price != null ? String(initialData.price) : '',
        category: initialData.category || '',
        stock: initialData.stock != null ? String(initialData.stock) : '',
        thumbnail: initialData.thumbnail || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error on user input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) < 0)
      newErrors.price = 'A valid price is required.';
    if (!formData.category.trim()) newErrors.category = 'Category is required.';
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0)
      newErrors.stock = 'A valid stock quantity is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category.trim(),
      stock: parseInt(formData.stock, 10),
      thumbnail: formData.thumbnail.trim() || null,
    };

    onSubmit?.(payload);
  };

  const inputClass = (fieldName) =>
    [
      'w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition',
      errors[fieldName]
        ? 'border-red-400 focus:ring-red-300'
        : 'border-slate-300 focus:ring-sky-300 focus:border-sky-400',
    ].join(' ');

  return (
    <form id="product-form" onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="product-title" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Product Title <span className="text-red-500">*</span>
        </label>
        <input
          id="product-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="e.g. iPhone 15 Pro Max"
          className={inputClass('title')}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="product-description" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Description
        </label>
        <textarea
          id="product-description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Describe the product..."
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 resize-none transition"
        />
      </div>

      {/* Price + Stock row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product-price" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Price (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
            <input
              id="product-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="0.00"
              className={`${inputClass('price')} pl-7`}
            />
          </div>
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="product-stock" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            id="product-stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="0"
            className={inputClass('stock')}
          />
          {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="product-category" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Category <span className="text-red-500">*</span>
        </label>
        <input
          id="product-category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="e.g. smartphones"
          className={inputClass('category')}
        />
        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
      </div>

      {/* Thumbnail URL */}
      <div>
        <label htmlFor="product-thumbnail" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Product Image URL
        </label>
        <input
          id="product-thumbnail"
          name="thumbnail"
          type="url"
          value={formData.thumbnail}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="https://example.com/image.jpg"
          className={inputClass('thumbnail')}
        />
        {formData.thumbnail && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formData.thumbnail}
              alt="Thumbnail preview"
              className="h-20 w-20 object-cover rounded-lg border border-slate-200"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      {/* Form actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-200">
        <button
          id="product-form-cancel"
          type="button"
          onClick={() => router.push(cancelHref)}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          id="product-form-submit"
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : isEditing ? (
            'Save Changes'
          ) : (
            'Add Product'
          )}
        </button>
      </div>
    </form>
  );
}
