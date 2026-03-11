'use client';

import { Module } from '@/data/modules';

interface ModuleHeaderProps {
  module: Module;
  activeTab: 'learn' | 'quiz';
  onTabChange: (tab: 'learn' | 'quiz') => void;
}

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Beginner: 'bg-blue-100 text-blue-700 border-blue-200',
    Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
    Advanced: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span
      className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full border ${
        map[level] ?? 'bg-gray-100 text-gray-700 border-gray-200'
      }`}
    >
      {level}
    </span>
  );
}

export default function ModuleHeader({ module, activeTab, onTabChange }: ModuleHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Module info */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0 mt-0.5">{module.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-excel bg-excel-light px-2.5 py-0.5 rounded-full">
                Module {module.id}
              </span>
              <LevelBadge level={module.level} />
              <span className="text-xs text-gray-500 flex items-center gap-1">
                ⏱ {module.estimatedMinutes} min
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{module.title}</h1>
            <p className="text-gray-500 mt-1 text-sm">{module.tagline}</p>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="px-6 flex gap-1 border-t border-gray-100">
        <button
          onClick={() => onTabChange('learn')}
          className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-150 focus:outline-none ${
            activeTab === 'learn'
              ? 'text-excel border-b-2 border-excel'
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
          }`}
        >
          📖 Learn
        </button>
        <button
          onClick={() => onTabChange('quiz')}
          className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-150 focus:outline-none ${
            activeTab === 'quiz'
              ? 'text-excel border-b-2 border-excel'
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
          }`}
        >
          ✏️ Quiz
        </button>
      </div>
    </div>
  );
}
