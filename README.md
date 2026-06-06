# 💰 Personal Finance Manager

A modern, full-featured **Personal Finance Manager** web application built with React 19, TypeScript, and Vite. Track your expenses, manage budgets, and gain intelligent insights into your spending habits — all through a beautifully crafted, dark-mode UI.

---

## ✨ Features

- **Landing Page** — Cinematic 3D scroll sequence powered by Framer Motion
- **Dashboard** — Monthly expense overview with key stats and quick expense management
- **Budget Manager** — Create and manage budgets per category with visual progress bars
- **Budget Detail** — Deep-dive into a specific budget's expenses and spending history
- **Reports** — Monthly spending breakdown with interactive charts (Recharts)
- **Category Filtering** — Filter expenses by category across all views
- **Toast Notifications** — Real-time feedback on all user actions
- **Responsive Design** — Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build Tool | [Vite 7](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Animations | [Framer Motion](https://www.framer-motion.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [React Hot Toast](https://react-hot-toast.com/) |

### Backend
| Layer | Technology |
|---|---|
| API Framework | [FastAPI](https://fastapi.tiangolo.com/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |


---

## 📁 Project Structure

```
src/
├── api/
│   ├── axiosInstance.ts     # Axios base config
│   └── index.ts             # Budget & Expense API methods
├── components/
│   ├── BudgetForm.tsx
│   ├── BudgetProgressBar.tsx
│   ├── CategoryBadge.tsx
│   ├── ConfirmDeleteModal.tsx
│   ├── ExpenseForm.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── Skeleton.tsx
│   ├── StatCard.tsx
│   └── shared-assets/
│       └── credit-card/     # Animated credit card component
├── constants/
│   └── categories.ts        # Expense category definitions
├── pages/
│   ├── Landing.tsx          # Marketing landing page
│   ├── Dashboard.tsx        # Main dashboard
│   ├── Budgets.tsx          # Budget list & management
│   ├── BudgetDetail.tsx     # Single budget detail view
│   └── Reports.tsx          # Monthly reports & charts
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── utils/
│   ├── format.ts            # Currency & date formatters
│   ├── cn.ts                # Class name utility
│   └── cx.ts
├── App.tsx                  # Root component with routes
├── main.tsx                 # App entry point
└── index.css                # Global styles & design tokens
```

---

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |

---

## 🔌 Backend Setup

This frontend connects to a REST API backend. By default it expects the API at `http://127.0.0.1:8000/`.

The following endpoints are consumed:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/budgets/` | List all budgets |
| `POST` | `/budgets/` | Create a budget |
| `PUT` | `/budgets/:id` | Update a budget |
| `DELETE` | `/budgets/:id` | Delete a budget |
| `GET` | `/budgets/:id/summary` | Get budget summary with spending stats |
| `GET` | `/budgets/:id/expenses` | List expenses under a budget |
| `GET` | `/expenses/` | List all expenses |
| `POST` | `/expenses/` | Add an expense |
| `PUT` | `/expenses/:id` | Update an expense |
| `DELETE` | `/expenses/:id` | Delete an expense |
| `GET` | `/expenses/report/monthly` | Monthly category spending report |

You can override the base URL via the `VITE_API_URL` environment variable.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
