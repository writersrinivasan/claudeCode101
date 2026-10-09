"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/content/types";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const score = questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <section className="quiz" aria-labelledby="quiz-title">
      <h2 id="quiz-title">🧪 Knowledge check</h2>
      <p style={{ color: "var(--text-muted)", margin: 0 }}>Pick an answer to see the explanation.</p>
      {questions.map((q, i) => {
        const picked = answers[i];
        const isAnswered = picked !== undefined;
        return (
          <div className="quiz-q" key={i}>
            <p>
              {i + 1}. {q.q}
            </p>
            <div className="quiz-options">
              {q.options.map((opt, j) => {
                let cls = "quiz-option";
                if (isAnswered && j === q.answer) cls += " correct";
                else if (isAnswered && j === picked) cls += " wrong";
                return (
                  <button
                    type="button"
                    key={j}
                    className={cls}
                    disabled={isAnswered}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div className="quiz-explain">
                {picked === q.answer ? "✅ Correct. " : "❌ Not quite. "}
                {q.explain}
              </div>
            )}
          </div>
        );
      })}
      {answered === questions.length && (
        <div className="quiz-score">
          Score: {score} / {questions.length}{" "}
          <button type="button" className="chip" onClick={() => setAnswers({})}>
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
