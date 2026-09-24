'use client';

export default function CategoryFilter({ categories = [], selectedCategory = '', onSelectCategory }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onSelectCategory(e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
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
