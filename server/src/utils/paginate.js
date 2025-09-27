export function buildPagination({ page = 1, limit = 10 }) {
  page = Number(page) || 1;
  limit = Math.min(100, Number(limit) || 10);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
