"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wand2,
  Briefcase,
  Home,
  X,
  Layers,
  LayoutDashboard,
} from "lucide-react";

export default function ModeSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded Panel */}
      {open && (
        <div className="mb-4 w-80 rounded-2xl bg-white shadow-xl border overflow-hidden animate-fade-in-up">
          <div className="px-5 py-4 border-b text-lg font-semibold text-gray-700">
            Switch Mode
          </div>

          <nav className="flex flex-col">
            <Link
              href="/career-agent"
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <Wand2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="leading-snug">
                <p className="text-sm font-medium text-gray-900">
                  Career Agent AI
                </p>
                <p className="text-xs text-gray-600">
                  Chat with AI guidance and career advice
                </p>
              </div>
            </Link>

            <Link
              href="/job-matches"
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <Briefcase className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="leading-snug">
                <p className="text-sm font-medium text-gray-900">
                  Job Listings
                </p>
                <p className="text-xs text-gray-600">
                  See available jobs now
                </p>
              </div>
            </Link>
            
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <LayoutDashboard  className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="leading-snug">
                <p className="text-sm font-medium text-gray-900">
                  Landing
                </p>
                <p className="text-xs text-gray-600">
                  Overview of the Smart Hiring platform
                </p>
              </div>
            </Link>

            <Link
              href="/start"
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <Home className="h-5 w-5 text-gray-600 mt-0.5" />
              <div className="leading-snug">
                <p className="text-sm font-medium text-gray-900">
                  Back to Start
                </p>
                <p className="text-xs text-gray-600">
                  Choose how you want to proceed
                </p>
              </div>
            </Link>
          </nav>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-40 items-center justify-center gap-3
                   rounded-full bg-blue-600 text-white shadow-lg
                   hover:bg-blue-700 transition"
        aria-label="Switch Mode"
      >
        {open ? <X className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
        <span className="font-medium">Switch</span>
      </button>
    </div>
  );
}
