import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Dashboard from '@/pages/Dashboard';
import Budgets from '@/pages/Budgets';
import BudgetDetail from '@/pages/BudgetDetail';
import Reports from '@/pages/Reports';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page at root — full screen, no navbar */}
        <Route path="/" element={<Landing />} />
        
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />

        {/* Protected App pages with shared navbar */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/app/*"
            element={
              <div className="min-h-screen bg-warm">
                <Navbar />
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-8 pb-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/budgets" element={<Budgets />} />
                  <Route path="/budgets/:id" element={<BudgetDetail />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </main>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    fontFamily: "'Space Grotesk', sans-serif",
                    borderRadius: '12px',
                    border: '1px solid #E8E5DD',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                  },
                  success: {
                    iconTheme: { primary: '#0D9488', secondary: '#fff' },
                  },
                  error: {
                    iconTheme: { primary: '#EF4444', secondary: '#fff' },
                  },
                }}
              />
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
