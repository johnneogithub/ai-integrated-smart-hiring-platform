"use client";

import { createContext, useContext } from "react";

export type ActiveSection =
  | "hero"
| "benefits"
  | "testimonials"
  | "faq"
  | null;

export const ActiveSectionContext =
  createContext<ActiveSection>(null);

export const useActiveSection = () =>
  useContext(ActiveSectionContext);