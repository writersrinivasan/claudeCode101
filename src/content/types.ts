// Content model for the portal. Every module page is rendered from these blocks,
// so adding material means editing data, not JSX.

export type CalloutVariant = "tip" | "note" | "warning" | "pro";

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; lang?: string; title?: string }
  | { type: "callout"; variant: CalloutVariant; title?: string; text: string }
  | { type: "prompt"; text: string; label?: string; why?: string }
  | { type: "flow"; steps: string[]; title?: string; vertical?: boolean }
  | {
      type: "compare";
      left: { title: string; items: string[]; tone?: "bad" | "neutral" };
      right: { title: string; items: string[]; tone?: "good" | "neutral" };
    }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "steps";
      items: { title: string; body: string; code?: string; prompt?: string }[];
    }
  | { type: "cards"; items: { title: string; body: string; icon?: string }[] };

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type Module = {
  slug: string;
  number: number;
  title: string;
  tagline: string;
  time: string;
  minutes: number;
  mode: string;
  icon: string;
  objectives: string[];
  sections: Section[];
  takeaways: string[];
  quiz: QuizQuestion[];
};

export type Lab = {
  slug: string;
  title: string;
  module: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  goal: string;
  steps: { title: string; body: string; code?: string; prompt?: string }[];
  success: string[];
  stretch?: string[];
};

export type PromptEntry = {
  title: string;
  category: string;
  prompt: string;
  when: string;
};
