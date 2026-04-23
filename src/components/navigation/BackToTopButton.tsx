"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = 750;

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY * (1 - easeInOut(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[45]">
      <button
        onClick={scrollToTop}
        aria-label="Go back to the top"
        className="
          group relative
          h-12 w-12
          overflow-hidden
          rounded-full
          bg-yellow-500 text-white
          shadow-lg
          transition-all duration-300 ease-out
          hover:w-56
          hover:bg-yellow-600
          origin-right
        "
      >
        {/* Centered icon */}
        <div
            className="
                absolute inset-0 flex items-center justify-center
                transition-opacity duration-200
                group-hover:opacity-0
            "
            >
            <ArrowUp className="h-5 w-5" />
        </div>


        {/* Sliding label */}
        <span
          className="
            absolute right-12 top-1/2 -translate-y-1/2
            whitespace-nowrap
            text-sm font-medium
            opacity-0 translate-x-2
            transition-all duration-300 delay-75
            group-hover:opacity-100 group-hover:translate-x-0
          "
        >
          Go back to the top
        </span>
      </button>
    </div>
  );
}
