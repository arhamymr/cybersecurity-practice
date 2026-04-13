"use client";

import React, { useState } from "react";

interface HintProps {
  title: string;
  hints: string[];
  code?: string;
}

export default function Hint({ title, hints, code }: HintProps) {
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const nextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const resetHints = () => {
    setCurrentHint(0);
    setShowHints(false);
  };

  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-blue-900">{title}</h4>
        <button
          onClick={() => setShowHints(!showHints)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {showHints ? "Hide Hints" : "Show Hints"}
        </button>
      </div>

      {showHints && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-blue-300">
            <p className="text-gray-700 font-medium mb-2">Hint {currentHint + 1}:</p>
            <p className="text-gray-600">{hints[currentHint]}</p>
          </div>

          {code && currentHint === hints.length - 1 && (
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-green-400 text-sm mb-2">Example Payload:</p>
              <code className="text-green-300 text-sm">{code}</code>
            </div>
          )}

          <div className="flex gap-2">
            {currentHint < hints.length - 1 && (
              <button
                onClick={nextHint}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Next Hint →
              </button>
            )}
            <button
              onClick={resetHints}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
