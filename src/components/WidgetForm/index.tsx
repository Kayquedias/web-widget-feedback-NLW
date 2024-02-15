import { useState } from "react";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      url: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      url: ideaImageUrl,
      alt: "imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      url: thoughtImageUrl,
      alt: "Imagem de uma nuvem",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes; // a propriedade keyof pera somente os títulos do objeto (BUG, IDEA, OTHER)

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <>
      <div className="bg-zinc-900 relative flex flex-col items-center p-4 mb-4 rounded-2xl shadow-lg w-[calc(100vw-2rem)] md:w-auto">
        {feedbackSent ? (
          <FeedbackSuccessStep
            onRestartFeedbackRequested={handleRestartFeedback}
          />
        ) : (
          <>
            {!feedbackType ? (
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )}
          </>
        )}

        <footer>
          Feito por{" "}
          <a
            className="underline underline-offset-2"
            href="https://github.com/Kayquedias"
          >
            Kayque Dias
          </a>
        </footer>
      </div>
    </>
  );
}
