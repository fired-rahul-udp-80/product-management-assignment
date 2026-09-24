'use client';

export default function ProductSort({ sortBy = '', order = 'asc', onSortChange }) {
  const handleChange = (e) => {
    const val = e.target.value;
    if (!val) {
      onSortChange('', 'asc');
    } else {
      const [field, dir] = val.split('-');
      onSortChange(field, dir);
    }
  };

  const currentValue = sortBy ? `${sortBy}-${order}` : '';

  return (
    <select
      value={currentValue}
      onChange={handleChange}
      className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
    >
      <option value="">Default Sort</option>
      <option value="title-asc">Title (A - Z)</option>
      <option value="title-desc">Title (Z - A)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
      <option value="rating-desc">Rating (High to Low)</option>
      <option value="rating-asc">Rating (Low to High)</option>
    </select>
  );
}
