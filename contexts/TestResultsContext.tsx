import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TestResult {
  topicId: string;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  earnedPoints: number;
  maxPoints: number;
  completedAt: Date;
}

interface TestResultsContextType {
  results: Record<string, TestResult>;
  saveResult: (result: TestResult) => void;
  getResult: (topicId: string) => TestResult | undefined;
  clearResults: () => void;
}

const TestResultsContext = createContext<TestResultsContextType | undefined>(undefined);

export function TestResultsProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Record<string, TestResult>>({});

  function saveResult(result: TestResult) {
    setResults((prev) => ({
      ...prev,
      [result.topicId]: result,
    }));
  }

  function getResult(topicId: string): TestResult | undefined {
    return results[topicId];
  }

  function clearResults() {
    setResults({});
  }

  return (
    <TestResultsContext.Provider value={{ results, saveResult, getResult, clearResults }}>
      {children}
    </TestResultsContext.Provider>
  );
}

export function useTestResults() {
  const context = useContext(TestResultsContext);
  if (context === undefined) {
    throw new Error('useTestResults must be used within a TestResultsProvider');
  }
  return context;
}

