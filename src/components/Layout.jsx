import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Scissors, ArrowLeft } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-primary-100">
      <aside className="w-72 bg-primary-900 text-primary-100 flex flex-col shrink-0 border-r border-white/5">
        <div className="px-7 py-6 flex items-center gap-3">
          <div className="bg-accent-500 rounded-full p-2.5 shadow-lg shadow-accent-500/20">
            <Scissors size={18} className="text-primary-900" />
          </div>
          <div>
            <h1 className="font-serif font-semibold text-white text-lg tracking-wide">ClipRemind</h1>
            <p className="text-[11px] text-primary-500 tracking-wider uppercase">Salon Management</p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-5" />

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-500 text-primary-900 shadow-lg shadow-accent-500/20'
                    : 'text-primary-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              <span className="tracking-wide">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-primary-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={15} />
            <span className="tracking-wide">Back to Home</span>
          </Link>
        </div>

        <div className="px-7 py-5 border-t border-white/5">
          <p className="text-[10px] text-primary-600 tracking-widest uppercase">ClipRemind v1.0</p>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
