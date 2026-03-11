import { Module } from '@/data/modules';

interface WorkedExampleProps {
  workedExample: Module['workedExample'];
}

export default function WorkedExample({ workedExample }: WorkedExampleProps) {
  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-laci flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">E</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Worked Example</h2>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3">{workedExample.title}</h3>

      {/* Scenario callout */}
      <div className="bg-laci-light border border-laci/20 rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <span className="text-laci text-lg flex-shrink-0 mt-0.5">📋</span>
          <div>
            <div className="text-xs font-bold text-laci uppercase tracking-wider mb-1">
              Scenario
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">{workedExample.scenario}</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {workedExample.steps.map((s) => (
          <div key={s.step} className="flex gap-4">
            {/* Step number bubble */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-laci flex items-center justify-center">
                <span className="text-white text-sm font-bold">{s.step}</span>
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
              {/* Instruction */}
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {s.instruction}
              </p>

              {/* Formula */}
              {s.formula && (
                <div className="mt-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Formula
                  </span>
                  <code className="block mt-1 font-mono text-sm bg-gray-50 text-laci px-3 py-2 rounded-lg border border-gray-200 break-all">
                    {s.formula}
                  </code>
                </div>
              )}

              {/* Result */}
              {s.result && (
                <div className="mt-2 flex items-start gap-2">
                  <span className="text-laci font-bold text-sm flex-shrink-0 mt-0.5">→</span>
                  <p className="text-sm text-laci font-medium italic leading-relaxed">{s.result}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
