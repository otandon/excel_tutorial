'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTutorial } from '@/context/TutorialContext';
import { modules } from '@/data/modules';

const MODULE_SUMMARIES: Record<number, string> = {
  1: 'Excel Interface, Cell References, Relative vs Absolute, Arithmetic Formulas',
  2: 'SUM & AVERAGE, COUNT & COUNTA, IF Logic, SUMIF & COUNTIF',
  3: 'Why Lookups Matter, VLOOKUP Syntax, VLOOKUP Limits, XLOOKUP',
  4: 'PivotTable Basics, Creating PivotTables, Value Calculations, Grouping & Filtering',
  5: 'Chart Selection, Creating Charts, Client-Ready Formatting, Chart Polish & Export',
};

export default function CompletionPage() {
  const router = useRouter();
  const { moduleStatus, totalScore, totalQuestions, resetProgress } = useTutorial();

  const completedModules = Object.values(moduleStatus).filter((s) => s.completed).length;
  const pct = Math.round((totalScore / totalQuestions) * 100);

  function handleRestart() {
    resetProgress();
    router.push('/tutorial/1');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-laci-light via-white to-white">
      {/* Navigation */}
      <nav className="bg-laci sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white hover:text-white/80 transition-colors">
            <span className="text-xl">📊</span>
            <span className="tracking-wide">LACI Excel Workshop</span>
          </Link>
          <button
            onClick={handleRestart}
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            Restart Course
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Hero celebration */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4 animate-bounce inline-block">🏆</div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            You have completed the{' '}
            <span className="text-laci font-bold">LACI Excel Workshop</span>. You now have
            the Excel skills that power real professional work.
          </p>
          <p className="text-sm text-laci font-medium mt-3 tracking-wide">
            A training resource by Los Angeles Community Impact
          </p>
        </div>

        {/* Score summary card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Your Results</h2>

          {/* Big score display */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-laci bg-laci-light">
                <span className="text-4xl font-black text-laci">
                  {totalScore}/{totalQuestions}
                </span>
                <span className="text-sm font-semibold text-laci-dark">Total Score</span>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {/* Overall percentage */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-gray-700">Quiz Accuracy</span>
                  <span className="text-laci">{pct}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-laci rounded-full transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Modules completed */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-gray-700">Modules Completed</span>
                  <span className="text-laci">{completedModules}/5</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-laci rounded-full transition-all duration-1000"
                    style={{ width: `${(completedModules / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Performance message */}
              <div
                className={`text-sm font-medium px-4 py-2 rounded-lg ${
                  pct === 100
                    ? 'bg-laci-light text-laci'
                    : pct >= 80
                    ? 'bg-blue-50 text-blue-800'
                    : pct >= 60
                    ? 'bg-amber-50 text-amber-800'
                    : 'bg-gray-50 text-gray-700'
                }`}
              >
                {pct === 100
                  ? '🌟 Perfect score! Outstanding mastery of Excel.'
                  : pct >= 80
                  ? '💪 Excellent work! You have strong Excel skills.'
                  : pct >= 60
                  ? '👍 Good effort! Review any missed questions to solidify your knowledge.'
                  : '📚 Keep practicing — revisit the modules to reinforce the concepts.'}
              </div>
            </div>
          </div>

          {/* Module breakdown */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Module Breakdown
            </h3>
            <div className="space-y-3">
              {modules.map((mod) => {
                const status = moduleStatus[mod.id];
                const score = status?.quizScore ?? 0;
                const total = mod.quiz.length;
                const modPct = Math.round((score / total) * 100);
                const completed = status?.completed;

                return (
                  <div key={mod.id} className="flex items-center gap-4">
                    {/* Icon & title */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xl flex-shrink-0">{mod.icon}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">
                          {mod.id}. {mod.title}
                        </div>
                        <div className="text-xs text-gray-400 truncate">{MODULE_SUMMARIES[mod.id]}</div>
                      </div>
                    </div>

                    {/* Score & status */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          {score}/{total}
                        </div>
                        <div className="text-xs text-gray-400">{modPct}%</div>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          completed ? 'bg-laci text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {completed ? '✓' : '–'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certificate visual */}
        <div className="bg-white rounded-2xl border-2 border-laci/30 shadow-md p-8 mb-8 text-center relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 text-laci/20 text-4xl font-serif">✦</div>
          <div className="absolute top-3 right-3 text-laci/20 text-4xl font-serif">✦</div>
          <div className="absolute bottom-3 left-3 text-laci/20 text-4xl font-serif">✦</div>
          <div className="absolute bottom-3 right-3 text-laci/20 text-4xl font-serif">✦</div>

          <div className="text-5xl mb-3">🎓</div>
          <div className="text-xs font-bold text-laci uppercase tracking-widest mb-2">
            Certificate of Completion
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-1">LACI Excel Workshop</h3>
          <p className="text-gray-500 text-sm mb-1">Los Angeles Community Impact</p>
          <p className="text-gray-400 text-xs mb-4">Interactive Training Course</p>

          <div className="inline-block bg-laci-light border border-laci/30 rounded-xl px-6 py-3 mb-4">
            <div className="text-3xl font-black text-laci">{totalScore}/{totalQuestions}</div>
            <div className="text-xs text-laci-dark font-semibold">Points Earned</div>
          </div>

          <p className="text-xs text-gray-400 italic">
            Successfully completed 5 modules covering Excel Foundations, Essential Functions,<br />
            VLOOKUP & XLOOKUP, PivotTables, and Charts & Graphs
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRestart}
            className="flex-1 bg-laci hover:bg-laci-dark text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-base"
          >
            🔄 Restart Course
          </button>
          <Link
            href="/"
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-6 rounded-xl border-2 border-gray-200 transition-colors duration-200 text-base text-center"
          >
            ← Back to Home
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Your progress is saved locally. You can revisit any module at any time.
        </p>
      </div>
    </div>
  );
}
