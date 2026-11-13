import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import Logo from '../components/shared-assets/logo.jpg';

const features = [
  {
    icon: WalletCards,
    title: 'One calm view',
    description: 'Bring spending, budgets, and balances together in a dashboard that is easy to understand.',
  },
  {
    icon: BarChart3,
    title: 'Useful insights',
    description: 'See where your money goes and spot patterns before they become expensive habits.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    description: 'Your financial workspace is protected so you can focus on making confident decisions.',
  },
];

const transactions = [
  { label: 'Monthly income', value: '+$5,240.00', color: 'text-emerald-500' },
  { label: 'Home & utilities', value: '-$1,240.00', color: 'text-slate-700' },
  { label: 'Food & dining', value: '-$468.20', color: 'text-slate-700' },
];

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F8F5] text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-0 h-[680px] bg-[radial-gradient(circle_at_75%_5%,rgba(45,212,191,0.18),transparent_35%),linear-gradient(180deg,#f4fbf8_0%,#f7f8f5_74%)]" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2">
          <img src={Logo} alt="Personal Finance Manager home" className="h-auto w-56 max-w-[60vw] object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950 sm:block">
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Make money feel simpler
          </div>
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
            Your money,
            <span className="block text-brand">clearer.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-slate-600 sm:text-xl">
            Finsight gives you a focused, friendly way to track spending, plan budgets, and build better financial habits.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a href="#features" className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white/70 px-6 py-3.5 font-semibold text-slate-700 transition hover:border-brand/40 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2">
              Explore features
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            {['No credit card', 'Private workspace', 'Built for real life'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[620px]" aria-label="Finsight dashboard preview">
          <div className="absolute -inset-8 rounded-[3rem] bg-brand/10 blur-3xl" aria-hidden="true" />
          <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-[0_30px_90px_rgba(15,118,110,0.18)] backdrop-blur sm:p-5">
            <div className="rounded-[1.4rem] bg-slate-950 p-4 text-white sm:p-6">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/50">Good morning, Naresh</p>
                  <p className="mt-1 text-lg font-semibold">Your overview</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                  <CircleDollarSign className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-brand-dark to-brand p-5">
                <p className="text-sm text-white/70">Available balance</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">$8,420.80</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[72%] rounded-full bg-white" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-white/65">
                  <span>72% of monthly plan</span>
                  <span>+12.4%</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {transactions.map((transaction) => (
                  <div key={transaction.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                    <p className="text-[10px] leading-4 text-white/50">{transaction.label}</p>
                    <p className={`mt-2 text-sm font-semibold ${transaction.color === 'text-emerald-500' ? 'text-emerald-300' : 'text-white'}`}>
                      {transaction.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-200/80 bg-white/60 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-center text-sm font-medium text-slate-500 sm:justify-between sm:px-8 lg:px-10">
          <span className="text-slate-400">A better rhythm for your finances</span>
          <span>Track every expense</span>
          <span>Plan with confidence</span>
          <span>Grow your savings</span>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-dark">Everything in one place</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">Less spreadsheet. More progress.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-5 mb-10 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-center text-white sm:mx-8 sm:px-12 lg:mx-auto lg:max-w-7xl lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">Start with clarity</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">A healthier relationship with your money starts today.</h2>
        <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950">
          Create your free account
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <span>© {new Date().getFullYear()} Finsight</span>
        <span>Simple tools for a clearer financial life.</span>
      </footer>
    </main>
  );
}
