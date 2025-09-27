export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      <button disabled={page===1} onClick={() => onChange(page-1)} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
      <span className="text-sm">Page {page} / {totalPages}</span>
      <button disabled={page===totalPages} onClick={() => onChange(page+1)} className="px-3 py-1 bg-gray-200 rounded">Next</button>
    </div>
  );
}
