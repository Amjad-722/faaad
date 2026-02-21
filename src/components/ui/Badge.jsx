const styles = {
  scheduled: 'bg-accent-100 text-accent-700 ring-accent-200',
  completed: 'bg-green-50 text-green-700 ring-green-200',
  cancelled: 'bg-red-50 text-red-700 ring-red-200',
  noshow: 'bg-primary-100 text-primary-600 ring-primary-200',
  sent: 'bg-green-50 text-green-700 ring-green-200',
  failed: 'bg-red-50 text-red-700 ring-red-200',
  pending: 'bg-secondary-100 text-secondary-700 ring-secondary-200',
};

export default function Badge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${styles[status] || 'bg-primary-100 text-primary-600 ring-primary-200'} ${className}`}
    >
      {status}
    </span>
  );
}
