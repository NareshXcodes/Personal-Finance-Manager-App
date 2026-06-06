import { NavLink } from 'react-router-dom';
import { ScanEye, LayoutDashboard, PiggyBank, BarChart3 } from 'lucide-react';

const links = [
  { to: '/app/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/budgets', label: 'Budgets', icon: PiggyBank },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
];

export default function Navbar() {
  return (
    <nav className="dark-panel sticky top-0 z-50 border-b border-white/5 noise-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/app/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-brand glow-brand-sm transition-all group-hover:scale-105">
              <ScanEye className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Fin<span className="text-brand-light">sight</span>
            </span>
          </NavLink>

          <div className="flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/app/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand/15 text-brand-light shadow-[inset_0_0_12px_rgba(13,148,136,0.15)]'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
