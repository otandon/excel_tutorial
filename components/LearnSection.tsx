import { Module } from '@/data/modules';
import WorkedExample from './WorkedExample';

interface LearnSectionProps {
  module: Module;
  onStartQuiz: () => void;
}

function ConceptCard({ concept, index }: { concept: Module['concepts'][number]; index: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Card header with navy left accent */}
      <div className="flex">
        <div className="w-1 bg-laci flex-shrink-0" />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-full bg-laci-light flex items-center justify-center flex-shrink-0">
              <span className="text-laci text-xs font-bold">{index + 1}</span>
            </div>
            <h3 className="text-base font-bold text-gray-900">{concept.title}</h3>
          </div>

          {/* Body text — render newlines as paragraphs */}
          <div className="space-y-2">
            {concept.body.split('\n').map((line, i) => {
              if (line.trim() === '') return <div key={i} className="h-1" />;
              return (
                <p key={i} className="text-sm text-gray-700 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>

          {/* Formula block */}
          {concept.formula && (
            <div className="mt-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Example Formula
              </div>
              <code className="block font-mono text-sm bg-gray-50 text-laci px-4 py-3 rounded-lg border border-gray-200 break-all">
                {concept.formula}
              </code>
            </div>
          )}

          {/* Tip callout */}
          {concept.tip && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex gap-3">
              <span className="text-lg flex-shrink-0">💡</span>
              <p className="text-sm text-amber-900 leading-relaxed">{concept.tip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LearnSection({ module, onStartQuiz }: LearnSectionProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Download reminder for Module 1 */}
      {module.id === 1 && (
        <div className="mb-6 bg-laci-light border-2 border-laci rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-3xl flex-shrink-0">📥</span>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">Download the practice file before you begin</p>
            <p className="text-gray-600 text-xs mt-0.5">
              Every module uses real data from <strong>sample.csv</strong>. Open it in Excel now so you can follow along with each worked example.
            </p>
          </div>
          <a
            href="/data/sample.csv"
            download="sample.csv"
            className="flex-shrink-0 bg-laci hover:bg-laci-dark text-white font-bold px-4 py-2 rounded-xl transition-colors duration-200 text-sm inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>⬇</span>
            <span>Download sample.csv</span>
          </a>
        </div>
      )}

      {/* Section label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-laci font-bold text-sm">📖 CONCEPTS</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500 text-sm">{module.concepts.length} topics</span>
      </div>

      {/* Concept cards */}
      <div className="space-y-4">
        {module.concepts.map((concept, i) => (
          <ConceptCard key={i} concept={concept} index={i} />
        ))}
      </div>

      {/* Worked Example */}
      <WorkedExample workedExample={module.workedExample} />

      {/* Divider */}
      <div className="border-t border-gray-200 my-8" />

      {/* CTA to quiz */}
      <div className="bg-laci-light rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">✏️</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to test your knowledge?</h3>
        <p className="text-gray-600 text-sm mb-5">
          Answer {module.quiz.length} questions to complete this module and unlock the next one.
        </p>
        <button
          onClick={onStartQuiz}
          className="bg-laci hover:bg-laci-dark text-white font-bold px-8 py-3.5 rounded-xl transition-colors duration-200 text-base shadow-sm hover:shadow-md"
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}
