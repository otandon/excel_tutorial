'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { modules } from '@/data/modules';
import { useTutorial } from '@/context/TutorialContext';
import ProgressBar from './ProgressBar';

function LevelBadge({ level }: { level: string }) {
  const classes: Record<string, string> = {
    Beginner: 'bg-blue-100 text-blue-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${classes[level] ?? 'bg-gray-100 text-gray-600'}`}>
      {level}
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { moduleStatus, totalScore, totalQuestions, isModuleUnlocked } = useTutorial();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentModuleId = (() => {
    const match = pathname.match(/\/tutorial\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  })();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="px-4 py-4 bg-laci border-b border-laci-dark">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📊</span>
          <div>
            <div className="font-bold text-white text-sm leading-tight tracking-wide">
              LACI Excel Workshop
            </div>
            <div className="text-xs text-white/60">Interactive Tutorial</div>
          </div>
        </Link>
      </div>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Module List */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
          Modules
        </div>
        <ul className="space-y-1">
          {modules.map((mod) => {
            const status = moduleStatus[mod.id];
            const unlocked = isModuleUnlocked(mod.id);
            const isActive = currentModuleId === mod.id;
            const isCompleted = status?.completed;

            return (
              <li key={mod.id}>
                {unlocked ? (
                  <Link
                    href={`/tutorial/${mod.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                      isActive
                        ? 'bg-laci text-white shadow-sm'
                        : 'hover:bg-laci-light text-gray-700'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-semibold truncate ${
                          isActive ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {mod.id}. {mod.title}
                      </div>
                      <LevelBadge level={mod.level} />
                    </div>
                    {isCompleted ? (
                      <span
                        className={`text-lg flex-shrink-0 ${
                          isActive ? 'text-white/80' : 'text-laci'
                        }`}
                        title="Completed"
                      >
                        ✓
                      </span>
                    ) : null}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 cursor-not-allowed">
                    <span className="text-xl flex-shrink-0 opacity-50">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate text-gray-400">
                        {mod.id}. {mod.title}
                      </div>
                      <LevelBadge level={mod.level} />
                    </div>
                    <span className="text-gray-400 flex-shrink-0" title="Complete previous module to unlock">
                      🔒
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Score Footer */}
      <div className="border-t border-gray-200 px-4 py-3 bg-laci-light">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">Total Score</span>
          <span className="text-lg font-bold text-laci">
            {totalScore} / {totalQuestions}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          Quiz points earned
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-gray-300 rounded-lg p-2 shadow-sm hover:bg-gray-50 transition-colors"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation menu"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span
            className={`block h-0.5 bg-gray-700 rounded transition-all duration-200 ${
              mobileOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block h-0.5 bg-gray-700 rounded transition-all duration-200 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 bg-gray-700 rounded transition-all duration-200 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-250 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-hidden">
        {sidebarContent}
      </aside>
    </>
  );
}
