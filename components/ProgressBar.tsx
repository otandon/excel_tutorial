'use client';

import { useTutorial } from '@/context/TutorialContext';

export default function ProgressBar() {
  const { moduleStatus } = useTutorial();

  const completedCount = Object.values(moduleStatus).filter((s) => s.completed).length;
  const totalModules = 5;
  const percentage = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-600">Overall Progress</span>
        <span className="text-xs font-bold text-excel">
          {completedCount} of {totalModules} modules complete
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-excel rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage}% complete`}
        />
      </div>
      <div className="mt-1 text-right">
        <span className="text-xs text-gray-500">{percentage}%</span>
      </div>
    </div>
  );
}
