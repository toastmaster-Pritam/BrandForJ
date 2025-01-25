export function toPercentage({
  value,
  total
}: {
  value: number;
  total: number;
}) {
  return Math.round((value / total) * 100);
}
