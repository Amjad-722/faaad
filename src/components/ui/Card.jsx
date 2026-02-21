export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-primary-200/80 shadow-sm hover:shadow-md transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-7 py-5 border-b border-primary-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`px-7 py-5 ${className}`}>{children}</div>;
}
