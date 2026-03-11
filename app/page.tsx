import Link from 'next/link';
import { modules } from '@/data/modules';

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Beginner: 'bg-blue-100 text-blue-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${map[level] ?? 'bg-gray-100 text-gray-600'}`}>
      {level}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-laci sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="font-bold text-white text-sm sm:text-base tracking-wide">LACI Excel Workshop</span>
          </div>
          <Link
            href="/tutorial/1"
            className="bg-white hover:bg-laci-light text-laci text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Start Learning →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-laci-light via-white to-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-laci/10 text-laci font-semibold text-sm px-4 py-2 rounded-full mb-6">
            <span>🎓</span>
            <span>Free Interactive Course</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
            Excel for{' '}
            <span className="text-laci">Consultants</span>
          </h1>

          <p className="text-sm font-medium text-laci mb-5 tracking-wide">
            A training resource by Los Angeles Community Impact
          </p>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            Master the Excel skills used in professional consulting work — from foundations and essential functions to
            VLOOKUP, PivotTables, and presentation-ready charts.
          </p>
          <p className="text-gray-500 mb-10 text-base">
            5 modules · 15 quiz questions · ~30 minutes · No account required
          </p>

          {/* Download Banner */}
          <div className="max-w-2xl mx-auto mb-8 bg-white border-2 border-laci rounded-2xl p-5 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-laci-light rounded-xl flex items-center justify-center">
                <span className="text-2xl">📥</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900 text-sm">Step 1: Download the practice file</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Download this file and open it in Excel before you begin. All modules use real data from this dataset.
                </p>
              </div>
              <a
                href="/data/sample.csv"
                download="sample.csv"
                className="flex-shrink-0 bg-laci hover:bg-laci-dark text-white font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>⬇</span>
                <span>Download sample.csv</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tutorial/1"
              className="bg-laci hover:bg-laci-dark text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              <span>Start Learning</span>
              <span>→</span>
            </Link>
            <a
              href="#modules"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 transition-colors duration-200 text-base inline-flex items-center justify-center gap-2"
            >
              <span>Browse Modules</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-laci py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '5', label: 'Modules' },
              { value: '15', label: 'Quiz Questions' },
              { value: '~30', label: 'Minutes' },
              { value: 'Beginner → Advanced', label: 'Skill Range' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-white font-black text-2xl sm:text-3xl">{stat.value}</div>
                <div className="text-white/70 text-sm font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Cards */}
      <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">What You'll Learn</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Five carefully structured modules that build on each other — from core concepts to professional-grade skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={`/tutorial/${mod.id}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-laci hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{mod.icon}</span>
                  <div className="flex items-center gap-2">
                    <LevelBadge level={mod.level} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-xs font-bold text-laci mb-1">Module {mod.id}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-laci transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{mod.tagline}</p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    ⏱ {mod.estimatedMinutes} min
                  </span>
                  <span className="text-xs font-semibold text-laci group-hover:translate-x-1 transition-transform inline-block">
                    Start →
                  </span>
                </div>
              </Link>
            ))}

            {/* Completion card */}
            <div className="bg-gradient-to-br from-laci-light to-white rounded-2xl border border-laci/30 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Course Certificate</h3>
              <p className="text-sm text-gray-500">
                Complete all 5 modules to earn your LACI Excel Workshop completion badge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Learn, practice, and master — at your own pace.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: '📖',
                step: '01',
                title: 'Learn',
                description:
                  'Each module starts with clear concept explanations and a real-world worked example drawn from a nonprofit donor dataset.',
              },
              {
                icon: '✏️',
                step: '02',
                title: 'Practice',
                description:
                  'Test your understanding with 3 targeted quiz questions. Instant feedback explains why each answer is right or wrong.',
              },
              {
                icon: '🏆',
                step: '03',
                title: 'Master',
                description:
                  'Complete all 5 modules to unlock your certificate and see your full score breakdown. Progress is saved automatically.',
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-laci-light rounded-2xl mb-4">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1 text-xs font-bold text-laci/30">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tutorial/1"
              className="bg-laci hover:bg-laci-dark text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              <span>Get Started — It's Free</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-laci py-8 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">📊</span>
          <span className="font-semibold text-white">LACI Excel Workshop</span>
        </div>
        <p className="text-white/60">A training resource by Los Angeles Community Impact</p>
      </footer>
    </div>
  );
}
