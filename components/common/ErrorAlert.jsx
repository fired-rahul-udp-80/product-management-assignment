export default function ErrorAlert({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4 text-red-800 flex items-start justify-between shadow-xs">
      <div>
        <h4 className="font-semibold text-red-700">{title}</h4>
        <p className="text-sm mt-1 text-red-600">{message || 'Failed to complete request. Please try again.'}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-xs font-semibold text-white rounded-md transition shadow-2xs"
        >
          Retry
        </button>
      )}
    </div>
  );
}
