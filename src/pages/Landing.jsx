import { Link } from 'react-router-dom';
import {
  Scissors, Clock, MessageSquare, Users, CalendarCheck,
  ArrowRight, CheckCircle2, Star, Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Client Portfolio',
    desc: 'Maintain an elegant roster of your clientele with detailed profiles and preferences.',
  },
  {
    icon: CalendarCheck,
    title: 'Effortless Booking',
    desc: 'Schedule appointments with a single click. Your calendar, beautifully organized.',
  },
  {
    icon: MessageSquare,
    title: 'SMS Reminders',
    desc: 'Personalized text reminders ensure your clients always arrive on time.',
  },
  {
    icon: Clock,
    title: 'Fewer No-Shows',
    desc: 'Intelligent reminders reduce missed appointments by up to 40%.',
  },
];

const steps = [
  { num: '01', title: 'Curate Your Clients', desc: 'Build your client list with names, numbers, and personal notes.' },
  { num: '02', title: 'Book Appointments', desc: 'Set dates, times, and services with elegant simplicity.' },
  { num: '03', title: 'Relax & Remind', desc: 'Automatic SMS reminders handle the rest. You focus on the craft.' },
];

const testimonials = [
  { name: 'Marcus T.', role: 'Master Barber', text: 'My no-shows dropped by half in the first month. Clients actually thank me for the reminders.', avatar: 'M' },
  { name: 'Sarah L.', role: 'Salon Owner', text: 'The elegance of this tool matches the experience we give our clients. Simple, refined, effective.', avatar: 'S' },
  { name: 'James K.', role: 'Creative Stylist', text: 'Finally something that does one thing beautifully — keeps my clients coming back.', avatar: 'J' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent-500 rounded-full p-2.5 shadow-lg shadow-accent-500/20">
              <Scissors size={20} className="text-primary-900" />
            </div>
            <span className="text-xl font-serif font-semibold text-white tracking-wide">ClipRemind</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:inline tracking-wide">Features</a>
            <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:inline tracking-wide">How It Works</a>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-accent-500 text-primary-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent-400 transition-all hover:shadow-lg hover:shadow-accent-500/25"
            >
              Open App <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-accent-300 text-xs font-medium px-4 py-2 rounded-full mb-8 border border-white/10">
            <Sparkles size={13} /> Crafted for premium salons
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold text-white leading-[1.1] max-w-4xl mx-auto">
            Every great style begins with
            <span className="text-accent-400 italic"> an appointment kept</span>
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-primary-400 max-w-2xl mx-auto leading-relaxed font-light">
            Automated SMS reminders that match the quality of your craft.
            Fewer no-shows, fuller chairs, happier clients.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-3 bg-accent-500 text-primary-900 font-semibold px-9 py-4 rounded-full hover:bg-accent-400 transition-all shadow-xl shadow-accent-500/20 hover:shadow-accent-500/30"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-white/70 font-medium px-6 py-4 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              See How It Works
            </a>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12 text-sm text-primary-500">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-500" /> Free to start</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-500" /> No credit card</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-500" /> 2 min setup</span>
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      {/* Features */}
      <section id="features" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent-600 text-sm font-semibold tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-primary-900">
              Refined tools for refined professionals
            </h2>
            <p className="mt-4 text-primary-500 max-w-xl mx-auto leading-relaxed">
              Everything you need to manage your salon — nothing superfluous.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-primary-50 rounded-2xl p-7 hover:bg-primary-900 transition-all duration-300 border border-primary-200 hover:border-primary-800"
              >
                <div className="bg-accent-500/10 group-hover:bg-accent-500/20 rounded-xl p-3.5 w-fit mb-5 transition-colors">
                  <f.icon size={24} className="text-accent-600 group-hover:text-accent-400 transition-colors" />
                </div>
                <h3 className="font-serif font-semibold text-primary-900 group-hover:text-white text-lg mb-2 transition-colors">{f.title}</h3>
                <p className="text-sm text-primary-500 group-hover:text-primary-400 leading-relaxed transition-colors">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-primary-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent-500 text-sm font-semibold tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-white">
              Simplicity is the ultimate sophistication
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent-500/40 to-transparent" />
                )}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-primary-900 text-lg font-serif font-bold flex items-center justify-center mx-auto mb-6 shadow-xl shadow-accent-500/20">
                  {s.num}
                </div>
                <h3 className="font-serif font-semibold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-sm text-primary-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent-600 text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-primary-900">
              Loved by professionals
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-primary-50 rounded-2xl p-8 border border-primary-200 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <p className="text-primary-700 leading-relaxed mb-6 italic font-serif">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-primary-200">
                  <div className="w-10 h-10 rounded-full bg-primary-900 text-accent-400 font-serif font-semibold text-sm flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 text-sm">{t.name}</p>
                    <p className="text-xs text-primary-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-500/10 text-accent-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-accent-500/20">
            <Scissors size={13} /> Start today
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white leading-tight">
            Your clients deserve
            <span className="text-accent-400 italic"> to be remembered</span>
          </h2>
          <p className="mt-6 text-primary-400 text-lg leading-relaxed">
            Join professionals who use ClipRemind to deliver an exceptional client experience from the very first reminder.
          </p>
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-3 bg-accent-500 text-primary-900 font-semibold px-9 py-4 rounded-full hover:bg-accent-400 transition-all shadow-xl shadow-accent-500/20 hover:shadow-accent-500/30 mt-10"
          >
            Open Your Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Scissors size={16} className="text-accent-500" />
            <span className="font-serif font-semibold text-white text-sm tracking-wide">ClipRemind</span>
          </div>
          <p className="text-xs text-primary-600">&copy; {new Date().getFullYear()} ClipRemind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
