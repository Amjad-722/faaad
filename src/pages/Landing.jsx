import { Link } from 'react-router-dom';
import {
  Scissors, Clock, MessageSquare, Users, CalendarCheck,
  ArrowRight, CheckCircle2, Star,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Client Management',
    desc: 'Keep your client list organized with contact info, notes, and appointment history.',
  },
  {
    icon: CalendarCheck,
    title: 'Easy Scheduling',
    desc: 'Create and manage appointments in seconds. See your day at a glance.',
  },
  {
    icon: MessageSquare,
    title: 'SMS Reminders',
    desc: 'Automatic text reminders so clients never miss their appointments.',
  },
  {
    icon: Clock,
    title: 'Reduce No-Shows',
    desc: 'Timely reminders cut no-shows by up to 40%, keeping your chair filled.',
  },
];

const steps = [
  { num: '1', title: 'Add Your Clients', desc: 'Import or create your client list with phone numbers.' },
  { num: '2', title: 'Schedule Appointments', desc: 'Book haircuts with date, time, and service type.' },
  { num: '3', title: 'Reminders Go Out', desc: 'SMS reminders are sent automatically before each appointment.' },
];

const testimonials = [
  { name: 'Marcus T.', role: 'Barber, 6 years', text: 'My no-shows dropped by half in the first month. Clients actually thank me for the reminders.' },
  { name: 'Sarah L.', role: 'Salon Owner', text: 'So simple to use. I added all my clients in 10 minutes and it just works.' },
  { name: 'James K.', role: 'Independent Stylist', text: 'Finally something that does one thing well — reminds people to show up.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-primary-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent-500 rounded-lg p-2">
              <Scissors size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-primary-900">ClipRemind</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-primary-500 hover:text-primary-800 transition-colors hidden sm:inline">Features</a>
            <a href="#how-it-works" className="text-sm text-primary-500 hover:text-primary-800 transition-colors hidden sm:inline">How It Works</a>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-secondary-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-secondary-700 transition-colors"
            >
              Open App <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-white to-accent-50" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Star size={13} /> Built for barbers & stylists
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight max-w-3xl mx-auto">
            Never lose a client to a
            <span className="text-secondary-600"> missed appointment</span>
          </h1>
          <p className="mt-6 text-lg text-primary-500 max-w-2xl mx-auto leading-relaxed">
            ClipRemind sends automatic SMS reminders to your clients before their haircut.
            Simple scheduling, fewer no-shows, happier clients.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-secondary-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-secondary-700 transition-colors shadow-lg shadow-secondary-200"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-primary-600 font-medium px-6 py-3.5 rounded-xl hover:bg-primary-50 transition-colors"
            >
              See How It Works
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-primary-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green-500" /> Free to start</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green-500" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green-500" /> Setup in 2 min</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-primary-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary-900">Everything you need, nothing you don't</h2>
            <p className="mt-3 text-primary-500 max-w-xl mx-auto">
              A focused toolkit for independent barbers and small salons.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl border border-primary-200 p-6 hover:shadow-md hover:border-secondary-200 transition-all"
              >
                <div className="bg-secondary-100 rounded-lg p-3 w-fit mb-4">
                  <f.icon size={22} className="text-secondary-600" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">{f.title}</h3>
                <p className="text-sm text-primary-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary-900">Up and running in minutes</h2>
            <p className="mt-3 text-primary-500">Three simple steps to fewer no-shows.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent-200">
                  {s.num}
                </div>
                <h3 className="font-semibold text-primary-900 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-primary-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-primary-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary-900">Trusted by barbers & stylists</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-primary-200 p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <p className="text-sm text-primary-600 leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-primary-900 text-sm">{t.name}</p>
                  <p className="text-xs text-primary-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900">
            Ready to fill every chair?
          </h2>
          <p className="mt-4 text-primary-500 text-lg">
            Start managing your appointments and let ClipRemind handle the reminders.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-secondary-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-secondary-700 transition-colors shadow-lg shadow-secondary-200 mt-8"
          >
            Open Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-200 bg-primary-900 text-primary-400">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scissors size={16} className="text-accent-400" />
            <span className="font-semibold text-white text-sm">ClipRemind</span>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} ClipRemind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
