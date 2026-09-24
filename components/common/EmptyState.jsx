export default function EmptyState({ message = 'No data found.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white p-8 shadow-xs">
      <h3 className="text-lg font-semibold text-slate-800 mb-1">No Results Available</h3>
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}
