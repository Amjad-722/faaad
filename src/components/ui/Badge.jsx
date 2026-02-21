const styles = {
  scheduled: 'bg-secondary-100 text-secondary-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  noshow: 'bg-primary-200 text-primary-600',
  sent: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  pending: 'bg-accent-100 text-accent-700',
};

export default function Badge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status] || 'bg-primary-100 text-primary-600'} ${className}`}
    >
      {status}
    </span>
  );
}
