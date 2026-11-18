"use client";

import React, { useState, useEffect } from "react";
import { Instagram, CheckCircle2, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastState {
  message: string;
  type?: "success" | "info" | "error";
  id: number;
}

export default function GlobalToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type?: "success" | "info" | "error" }>;
      if (customEvent.detail?.message) {
        setToast({
          message: customEvent.detail.message,
          type: customEvent.detail.type || "success",
          id: Date.now(),
        });
      }
    };

    window.addEventListener("the_petal_muse_toast", handleToast);
    return () => window.removeEventListener("the_petal_muse_toast", handleToast);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none w-full max-w-md px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto rounded-2xl bg-stone-950/95 backdrop-blur-xl border border-amber-400/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white flex items-center justify-between gap-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-serif text-amber-200 tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  THE PETAL MUSE Concierge
                </p>
                <p className="text-xs text-stone-200 mt-0.5 font-sans leading-snug">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-stone-400 hover:text-white p-1 rounded-lg transition"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
