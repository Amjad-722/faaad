export default function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-1.5 tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-xl border px-4 py-2.5 text-sm
          transition-all focus:outline-none focus:ring-2
          ${error
            ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
            : 'border-primary-300 focus:ring-accent-200 focus:border-accent-500'
          }
        `}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-1.5 tracking-wide">
          {label}
        </label>
      )}
      <select
        className={`
          w-full rounded-xl border px-4 py-2.5 text-sm bg-white
          transition-all focus:outline-none focus:ring-2
          ${error
            ? 'border-red-300 focus:ring-red-200'
            : 'border-primary-300 focus:ring-accent-200 focus:border-accent-500'
          }
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-primary-700 mb-1.5 tracking-wide">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full rounded-xl border px-4 py-2.5 text-sm
          transition-all focus:outline-none focus:ring-2
          ${error
            ? 'border-red-300 focus:ring-red-200'
            : 'border-primary-300 focus:ring-accent-200 focus:border-accent-500'
          }
        `}
        rows={3}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
