export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-600 text-sm font-medium">{message}</p>
    </div>
  );
}
