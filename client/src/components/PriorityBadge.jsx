const colors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};
export default function PriorityBadge({ value }) {
  return <span className={`px-2 py-1 text-xs rounded ${colors[value]}`}>{value}</span>;
}
