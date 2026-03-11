'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ModuleStatus {
  started: boolean;
  completed: boolean;
  quizScore: number;
  quizTotal: number;
  quizAnswers: Record<string, number>;
}

interface TutorialContextValue {
  moduleStatus: Record<number, ModuleStatus>;
  currentModule: number;
  totalScore: number;
  totalQuestions: number;
  startModule: (moduleId: number) => void;
  recordAnswer: (
    moduleId: number,
    questionId: string,
    answerIndex: number,
    isCorrect: boolean
  ) => void;
  completeModule: (moduleId: number) => void;
  resetProgress: () => void;
  isModuleUnlocked: (moduleId: number) => boolean;
  setCurrentModule: (moduleId: number) => void;
}

const defaultModuleStatus = (): ModuleStatus => ({
  started: false,
  completed: false,
  quizScore: 0,
  quizTotal: 0,
  quizAnswers: {},
});

const TutorialContext = createContext<TutorialContextValue | null>(null);

const STORAGE_KEY = 'excel_tutorial_progress';
const TOTAL_QUESTIONS_PER_MODULE = 3;
const TOTAL_MODULES = 5;

function loadFromStorage(): Record<number, ModuleStatus> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(data: Record<number, ModuleStatus>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently ignore storage errors
  }
}

function buildInitialStatus(): Record<number, ModuleStatus> {
  const status: Record<number, ModuleStatus> = {};
  for (let i = 1; i <= TOTAL_MODULES; i++) {
    status[i] = defaultModuleStatus();
  }
  return status;
}

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [moduleStatus, setModuleStatus] = useState<Record<number, ModuleStatus>>(
    buildInitialStatus
  );
  const [currentModule, setCurrentModuleState] = useState<number>(1);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      // Merge with defaults in case new modules were added
      const merged = buildInitialStatus();
      for (const key of Object.keys(stored)) {
        const id = parseInt(key, 10);
        if (merged[id]) {
          merged[id] = { ...merged[id], ...stored[id] };
        }
      }
      setModuleStatus(merged);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever status changes (after hydration)
  useEffect(() => {
    if (hydrated) {
      saveToStorage(moduleStatus);
    }
  }, [moduleStatus, hydrated]);

  const totalScore = Object.values(moduleStatus).reduce((sum, s) => sum + s.quizScore, 0);
  const totalQuestions = TOTAL_MODULES * TOTAL_QUESTIONS_PER_MODULE;

  const startModule = useCallback((moduleId: number) => {
    setModuleStatus((prev) => {
      const updated = {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          started: true,
        },
      };
      return updated;
    });
    setCurrentModuleState(moduleId);
  }, []);

  const recordAnswer = useCallback(
    (moduleId: number, questionId: string, answerIndex: number, isCorrect: boolean) => {
      setModuleStatus((prev) => {
        const current = prev[moduleId] || defaultModuleStatus();
        // Don't re-record if already answered
        if (questionId in current.quizAnswers) return prev;
        const newAnswers = { ...current.quizAnswers, [questionId]: answerIndex };
        const newScore = current.quizScore + (isCorrect ? 1 : 0);
        const newTotal = current.quizTotal + 1;
        return {
          ...prev,
          [moduleId]: {
            ...current,
            quizAnswers: newAnswers,
            quizScore: newScore,
            quizTotal: newTotal,
          },
        };
      });
    },
    []
  );

  const completeModule = useCallback((moduleId: number) => {
    setModuleStatus((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        completed: true,
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = buildInitialStatus();
    setModuleStatus(fresh);
    setCurrentModuleState(1);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const isModuleUnlocked = useCallback(
    (moduleId: number): boolean => {
      if (moduleId === 1) return true;
      return moduleStatus[moduleId - 1]?.completed === true;
    },
    [moduleStatus]
  );

  const setCurrentModule = useCallback((moduleId: number) => {
    setCurrentModuleState(moduleId);
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        moduleStatus,
        currentModule,
        totalScore,
        totalQuestions,
        startModule,
        recordAnswer,
        completeModule,
        resetProgress,
        isModuleUnlocked,
        setCurrentModule,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial(): TutorialContextValue {
  const ctx = useContext(TutorialContext);
  if (!ctx) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return ctx;
}
