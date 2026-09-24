'use client';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, productId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl space-y-4">
        <h3 className="text-lg font-bold text-slate-100">Confirm Deletion</h3>
        <p className="text-sm text-slate-300">
          Are you sure you want to delete product <strong className="text-white">#{productId}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(productId)}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
