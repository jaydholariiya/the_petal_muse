"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";

export default function FloralMoodQuiz() {
  const { quiz } = SITE_CONTENT;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultType, setResultType] = useState<"romantic" | "sculptural" | "sensory" | null>(null);

  const handleSelectOption = (value: string) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate dominant answer
      const count: Record<string, number> = { romantic: 0, sculptural: 0, sensory: 0 };
      updated.forEach((v) => {
        count[v] = (count[v] || 0) + 1;
      });

      let topKey: "romantic" | "sculptural" | "sensory" = "romantic";
      let maxCount = -1;
      Object.entries(count).forEach(([k, c]) => {
        if (c > maxCount) {
          maxCount = c;
          topKey = k as any;
        }
      });
      setResultType(topKey);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultType(null);
  };

  const currentQ = quiz.questions[currentStep];
  const resultData = resultType ? quiz.results[resultType] : null;

  return (
    <section className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto">
      <div className="bg-butter-cream/60 backdrop-blur-md rounded-3xl p-5 sm:p-8 md:p-12 border border-ink-aubergine/10 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-mulberry-wine font-medium">
            {quiz.badge}
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-ink-aubergine font-light mt-1">
            {quiz.title}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-ink-aubergine/70 mt-2 max-w-md mx-auto">
            {quiz.description}
          </p>
        </div>

        {/* Quiz Steps or Result Card */}
        <AnimatePresence mode="wait">
          {!resultData ? (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col"
            >
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-ink-aubergine/50 font-sans mb-4">
                <span>Question 0{currentStep + 1} of 0{quiz.questions.length}</span>
                <div className="flex gap-1.5">
                  {quiz.questions.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentStep
                          ? "w-8 bg-mulberry-wine"
                          : idx < currentStep
                          ? "w-4 bg-mulberry-wine/50"
                          : "w-4 bg-ink-aubergine/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink-aubergine font-light mb-5 sm:mb-6 leading-snug">
                {currentQ.prompt}
              </h4>

              {/* Options */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.value)}
                    className="p-3.5 sm:p-4 rounded-2xl text-left bg-white/70 hover:bg-white text-ink-aubergine border border-ink-aubergine/10 hover:border-mulberry-wine transition-all duration-200 flex items-center justify-between group shadow-sm hover:shadow active:scale-[0.98]"
                  >
                    <span className="font-sans text-xs sm:text-sm md:text-base font-light text-ink-aubergine/90">
                      {opt.label}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase font-sans tracking-widest text-mulberry-wine opacity-60 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                      Select →
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-mulberry-wine/10 text-mulberry-wine flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-marigold-glow" />
              </div>

              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-mulberry-wine font-semibold">
                Your Botanical Profile
              </span>

              <h4 className="font-serif text-3xl sm:text-4xl text-ink-aubergine font-light mt-1">
                {resultData.title}
              </h4>

              <p className="font-serif italic text-base text-muted-jade mt-0.5">
                {resultData.subtitle}
              </p>

              <p className="mt-4 text-sm md:text-base font-sans font-light text-ink-aubergine/80 max-w-lg leading-relaxed">
                {resultData.summary}
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-white/80 border border-mulberry-wine/20 w-full max-w-md text-left">
                <span className="text-[10px] uppercase font-sans tracking-widest text-ink-aubergine/60">
                  Recommended Experience
                </span>
                <div className="font-serif text-xl text-mulberry-wine font-light mt-0.5">
                  {resultData.recommendation}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink-aubergine text-butter-cream font-sans text-xs uppercase tracking-[0.18em] hover:bg-mulberry-wine transition-colors shadow-md"
                >
                  <span>Enquire For This Aesthetic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-sans tracking-wider text-ink-aubergine/70 hover:text-ink-aubergine"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

