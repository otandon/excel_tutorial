'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import { modules } from '@/data/modules';
import { useTutorial } from '@/context/TutorialContext';
import Sidebar from '@/components/Sidebar';
import ModuleHeader from '@/components/ModuleHeader';
import LearnSection from '@/components/LearnSection';
import QuizSection from '@/components/QuizSection';

export default function TutorialPage() {
  const params = useParams();
  const router = useRouter();
  const { startModule, isModuleUnlocked, moduleStatus } = useTutorial();

  const moduleId = parseInt(params.moduleId as string, 10);

  // Validate module id
  if (isNaN(moduleId) || moduleId < 1 || moduleId > 5) {
    notFound();
  }

  const module = modules.find((m) => m.id === moduleId);

  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');

  useEffect(() => {
    // Reset to learn tab when navigating to a new module
    setActiveTab('learn');
  }, [moduleId]);

  useEffect(() => {
    if (module) {
      startModule(module.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  if (!module) {
    notFound();
  }

  const unlocked = isModuleUnlocked(moduleId);
  const prevModule = moduleId > 1 ? modules.find((m) => m.id === moduleId - 1) : null;
  const nextModule = moduleId < 5 ? modules.find((m) => m.id === moduleId + 1) : null;
  const isCompleted = moduleStatus[moduleId]?.completed;

  function handleStartQuiz() {
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Module Locked</h1>
            <p className="text-gray-600 mb-6">
              Complete{' '}
              <span className="font-semibold text-excel">
                Module {moduleId - 1}: {prevModule?.title}
              </span>{' '}
              to unlock this module.
            </p>
            <Link
              href={`/tutorial/${moduleId - 1}`}
              className="bg-excel hover:bg-excel-dark text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 inline-flex items-center gap-2"
            >
              ← Go to Module {moduleId - 1}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top padding for hamburger button */}
        <div className="lg:hidden h-14" />

        {/* Module Header with tabs */}
        <ModuleHeader module={module} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main content */}
        <main className="flex-1">
          {activeTab === 'learn' ? (
            <LearnSection module={module} onStartQuiz={handleStartQuiz} />
          ) : (
            <QuizSection module={module} />
          )}
        </main>

        {/* Bottom navigation */}
        <div className="border-t border-gray-200 bg-white px-4 sm:px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div>
              {prevModule ? (
                <Link
                  href={`/tutorial/${prevModule.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-excel transition-colors"
                >
                  ← {prevModule.icon} {prevModule.title}
                </Link>
              ) : (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-excel transition-colors"
                >
                  ← Home
                </Link>
              )}
            </div>

            {/* Module dots */}
            <div className="flex gap-1.5">
              {modules.map((m) => (
                <Link
                  key={m.id}
                  href={`/tutorial/${m.id}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    m.id === moduleId
                      ? 'bg-excel w-5'
                      : moduleStatus[m.id]?.completed
                      ? 'bg-excel/50'
                      : 'bg-gray-300'
                  }`}
                  title={`Module ${m.id}: ${m.title}`}
                />
              ))}
            </div>

            <div>
              {nextModule ? (
                isCompleted ? (
                  <Link
                    href={`/tutorial/${nextModule.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-excel hover:text-excel-dark transition-colors"
                  >
                    {nextModule.icon} {nextModule.title} →
                  </Link>
                ) : (
                  <button
                    onClick={handleStartQuiz}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 cursor-default"
                    title="Complete the quiz to unlock next module"
                  >
                    {nextModule.icon} {nextModule.title} →
                  </button>
                )
              ) : isCompleted ? (
                <Link
                  href="/completion"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-excel hover:text-excel-dark transition-colors"
                >
                  Finish Course 🎉
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
