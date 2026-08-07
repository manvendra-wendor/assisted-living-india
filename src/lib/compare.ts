export function toggleComparison(ids: string[], id: string, max = 3) {
  if (ids.includes(id)) return ids.filter((item) => item !== id);
  if (ids.length >= max) return ids;
  return [...ids, id];
}
