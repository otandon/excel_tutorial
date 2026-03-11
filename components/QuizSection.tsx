'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Module } from '@/data/modules';
import { useTutorial } from '@/context/TutorialContext';

interface QuizSectionProps {
  module: Module;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizSection({ module }: QuizSectionProps) {
  const router = useRouter();
  const { moduleStatus, recordAnswer, completeModule, isModuleUnlocked } = useTutorial();
  const status = moduleStatus[module.id];

  // Determine initial question index (skip already-answered questions)
  const getInitialIndex = () => {
    for (let i = 0; i < module.quiz.length; i++) {
      if (!(module.quiz[i].id in (status?.quizAnswers ?? {}))) {
        return i;
      }
    }
    return module.quiz.length; // All answered
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [localScore, setLocalScore] = useState(status?.quizScore ?? 0);
  const [moduleCompleted, setModuleCompleted] = useState(status?.completed ?? false);

  // Sync from context when module changes
  useEffect(() => {
    setCurrentIndex(getInitialIndex());
    setSelectedAnswer(null);
    setIsAnswered(false);
    setLocalScore(status?.quizScore ?? 0);
    setModuleCompleted(status?.completed ?? false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module.id]);

  const question = module.quiz[currentIndex];
  const isLastQuestion = currentIndex === module.quiz.length - 1;
  const allAnswered = currentIndex >= module.quiz.length;

  function handleSelect(optionIndex: number) {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    const isCorrect = optionIndex === question.correctIndex;
    if (isCorrect) {
      setLocalScore((s) => s + 1);
    }
    recordAnswer(module.id, question.id, optionIndex, isCorrect);
  }

  function handleNext() {
    if (isLastQuestion) {
      // Complete the module
      completeModule(module.id);
      setModuleCompleted(true);
      setCurrentIndex(module.quiz.length);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }

  function handleNavigateNext() {
    const nextId = module.id + 1;
    if (nextId > 5) {
      router.push('/completion');
    } else {
      router.push(`/tutorial/${nextId}`);
    }
  }

  // Completion state
  if (moduleCompleted || allAnswered) {
    const score = status?.quizScore ?? localScore;
    const total = module.quiz.length;
    const pct = Math.round((score / total) * 100);
    const isLast = module.id === 5;

    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          {/* Trophy */}
          <div className="text-6xl mb-4 animate-bounce">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Module Complete!</h2>
          <p className="text-gray-500 mb-6">
            You finished <span className="font-semibold text-gray-700">{module.title}</span>
          </p>

          {/* Score ring */}
          <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-excel bg-excel-light mb-6">
            <span className="text-3xl font-black text-excel">
              {score}/{total}
            </span>
            <span className="text-xs font-semibold text-excel-dark">{pct}%</span>
          </div>

          {/* Score message */}
          <p className="text-gray-600 mb-8 text-sm">
            {pct === 100
              ? 'Perfect score! Outstanding work.'
              : pct >= 67
              ? 'Great job! You have a solid understanding.'
              : 'Good effort! Review the concepts and try again anytime.'}
          </p>

          {/* Question-by-question breakdown */}
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-8 space-y-3">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Your Answers
            </div>
            {module.quiz.map((q, i) => {
              const answered = status?.quizAnswers?.[q.id];
              const correct = answered === q.correctIndex;
              return (
                <div key={q.id} className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      answered !== undefined
                        ? correct
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {answered !== undefined ? (correct ? '✓' : '✗') : '?'}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700 leading-snug">
                      Q{i + 1}: {q.question}
                    </p>
                    {answered !== undefined && !correct && (
                      <p className="text-xs text-green-700 mt-0.5">
                        Correct: {OPTION_LETTERS[q.correctIndex]}. {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          {isLast ? (
            <button
              onClick={() => router.push('/completion')}
              className="w-full bg-excel hover:bg-excel-dark text-white font-bold py-4 rounded-xl transition-colors duration-200 text-base"
            >
              🎉 See Your Final Results →
            </button>
          ) : (
            <button
              onClick={handleNavigateNext}
              className="w-full bg-excel hover:bg-excel-dark text-white font-bold py-4 rounded-xl transition-colors duration-200 text-base"
            >
              Next Module: {module.id + 1} →
            </button>
          )}
        </div>
      </div>
    );
  }

  // Quiz in-progress state
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress dots */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {module.quiz.map((q, i) => {
            const answered = q.id in (status?.quizAnswers ?? {});
            const isCurrent = i === currentIndex;
            return (
              <div
                key={q.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  answered
                    ? 'bg-excel w-8'
                    : isCurrent
                    ? 'bg-excel/40 w-6'
                    : 'bg-gray-200 w-4'
                }`}
              />
            );
          })}
        </div>
        <span className="text-sm font-semibold text-gray-500">
          Question {currentIndex + 1} of {module.quiz.length}
        </span>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
        {/* Score display */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {module.title}
          </span>
          <span className="text-sm font-semibold text-excel bg-excel-light px-3 py-1 rounded-full">
            {localScore} correct so far
          </span>
        </div>

        {/* Question */}
        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === question.correctIndex;

            let buttonClass =
              'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 text-sm font-medium ';

            if (!isAnswered) {
              buttonClass += 'border-gray-200 hover:border-excel hover:bg-excel-light text-gray-700 cursor-pointer';
            } else if (isCorrect) {
              buttonClass += 'border-green-500 bg-green-50 text-green-800 cursor-default';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-red-400 bg-red-50 text-red-800 cursor-default';
            } else {
              buttonClass += 'border-gray-200 bg-gray-50 text-gray-400 cursor-default';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    !isAnswered
                      ? 'border-gray-300 text-gray-500'
                      : isCorrect
                      ? 'border-green-500 bg-green-500 text-white'
                      : isSelected
                      ? 'border-red-400 bg-red-400 text-white'
                      : 'border-gray-200 text-gray-400'
                  }`}
                >
                  {OPTION_LETTERS[i]}
                </span>
                <span className="flex-1">{option}</span>
                {isAnswered && isCorrect && (
                  <span className="flex-shrink-0 text-green-600 font-bold">✓</span>
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <span className="flex-shrink-0 text-red-500 font-bold">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div
            className={`mt-5 rounded-xl p-4 flex gap-3 border ${
              selectedAnswer === question.correctIndex
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <span className="text-lg flex-shrink-0">
              {selectedAnswer === question.correctIndex ? '✅' : '❌'}
            </span>
            <div>
              <div
                className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  selectedAnswer === question.correctIndex ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {selectedAnswer === question.correctIndex ? 'Correct!' : 'Not quite'}
              </div>
              <p
                className={`text-sm leading-relaxed ${
                  selectedAnswer === question.correctIndex ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {question.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full bg-excel hover:bg-excel-dark text-white font-bold py-4 rounded-xl transition-all duration-200 text-base shadow-sm hover:shadow-md"
        >
          {isLastQuestion ? 'Complete Module →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
