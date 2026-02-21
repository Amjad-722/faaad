export default function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          transition-colors focus:outline-none focus:ring-2
          ${error
            ? 'border-red-400 focus:ring-red-300 focus:border-red-500'
            : 'border-primary-300 focus:ring-secondary-300 focus:border-secondary-500'
          }
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`
          w-full rounded-lg border px-3 py-2 text-sm bg-white
          transition-colors focus:outline-none focus:ring-2
          ${error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-primary-300 focus:ring-secondary-300 focus:border-secondary-500'
          }
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          transition-colors focus:outline-none focus:ring-2
          ${error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-primary-300 focus:ring-secondary-300 focus:border-secondary-500'
          }
        `}
        rows={3}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
