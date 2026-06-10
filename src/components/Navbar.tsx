import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PiggyBank, BarChart3 } from 'lucide-react';
import Logo from '@/components/shared-assets/Logo';

const links = [
  { to: '/app/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/budgets', label: 'Budgets', icon: PiggyBank },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
];

export default function Navbar() {
  return (
    <>
      {/* Top Header */}
      <nav className="dark-panel sticky top-0 z-50 border-b border-white/5 noise-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <NavLink to="/app/" className="flex items-center gap-2.5 group">
              <Logo className="w-8 h-8 transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold tracking-tight text-white">
                Fin<span className="text-brand-light">sight</span>
              </span>
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
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

      {/* Mobile Top Dock */}
      <div className="md:hidden fixed top-[76px] left-4 right-4 z-40">
        <div className="dark-panel border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl p-2 flex items-center justify-around noise-bg">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-full py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-brand-light bg-brand/15 shadow-[inset_0_0_12px_rgba(13,148,136,0.15)]'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold tracking-wide">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
