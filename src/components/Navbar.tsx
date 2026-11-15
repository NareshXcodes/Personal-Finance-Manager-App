import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PiggyBank, BarChart3, LogOut } from 'lucide-react';
import Logo from '@/components/shared-assets/logo.jpg';

const links = [
  { to: '/app/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/budgets', label: 'Budgets', icon: PiggyBank },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
];

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Top Header */}
      <nav className="dark-panel sticky top-0 z-50 border-b border-white/5 noise-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between sm:h-16">
            <NavLink to="/app/" className="flex items-center group">
              <img
                src={Logo}
                alt="Personal Finance Manager home"
                className="h-10 w-auto max-w-[42vw] object-contain transition-transform group-hover:scale-105 sm:h-12 sm:max-w-none"
              />
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
              <div className="w-px h-6 bg-white/10 mx-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/50 hover:text-danger hover:bg-danger/10 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Dock */}
      <div className="fixed left-2 right-2 top-16 z-40 md:hidden sm:left-4 sm:right-4 sm:top-[76px]">
        <div className="dark-panel flex items-center justify-around rounded-2xl border border-white/10 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl noise-bg sm:p-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app/'}
              className={({ isActive }) =>
                `flex min-h-11 w-full flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-all duration-200 sm:gap-1 sm:py-2 ${
                  isActive
                    ? 'text-brand-light bg-brand/15 shadow-[inset_0_0_12px_rgba(13,148,136,0.15)]'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`
              }
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-[9px] font-semibold tracking-wide sm:text-[10px]">{label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex min-h-11 w-full flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-white/50 transition-all duration-200 hover:bg-danger/10 hover:text-danger sm:gap-1 sm:py-2"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-[9px] font-semibold tracking-wide sm:text-[10px]">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
