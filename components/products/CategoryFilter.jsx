'use client';

export default function CategoryFilter({ categories = [], selectedCategory = '', onSelectCategory }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onSelectCategory(e.target.value)}
      className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => {
        const value = typeof cat === 'object' ? cat.slug : cat;
        const name = typeof cat === 'object' ? cat.name : cat;
        return (
          <option key={value} value={value}>
            {name}
          </option>
        );
      })}
    </select>
  );
}
