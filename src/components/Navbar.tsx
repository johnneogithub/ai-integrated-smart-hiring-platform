"use client";

import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import ThemeChanger from "./DarkSwitch";
import { useRouter } from "next/navigation";

export const Navbar = () => {

  const router = useRouter();

  const navigation = [
    { label: "Benefits", hash: "benefits" },
    { label: "Testimonials", hash: "testimonials" },
    { label: "FAQ", hash: "faq" },
  ];

  /** Centralized hash handler */
  const goToSection = (hash: string) => {
    window.history.pushState(null, "", `#${hash}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const scrollToTop = () => {
    // 1. Navigate to landing page
    router.push("/");

    // 2. Run smooth scroll AFTER navigation paints
    requestAnimationFrame(() => {
      const startY = window.scrollY;
      const startTime = performance.now();
      const duration = 700;

      const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, startY * (1 - easeInOut(progress)));

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    });
  };


  return (

    <div className="w-full sticky top-0 z-50 bg-white dark:bg-trueGray-900">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">

        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 cursor-pointer"
          aria-label="Back to top"
        >
          <Image
            src="/smart-hiring-platform-logo.png"
            alt="Smart Hiring Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-2xl font-medium text-blue-600 dark:text-gray-100">
            Smart Hiring Platform
          </span>
        </button>

        {/* Mobile Menu */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:outline-none"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-col w-full mt-4 lg:hidden">
                {navigation.map((item) => (
                  <button
                    key={item.hash}
                    onClick={() => goToSection(item.hash)}
                    className="w-full px-4 py-2 text-left text-gray-600 hover:text-indigo-600"
                  >
                    {item.label}
                  </button>
                ))}

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center">
          <ul className="flex items-center space-x-4">
            {navigation.map((item) => (
              <li key={item.hash}>
                <button
                  onClick={() => goToSection(item.hash)}
                  className="px-4 py-2 text-lg text-gray-800 dark:text-gray-200 hover:text-indigo-500"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>


          <div className="ml-4">
            <ThemeChanger />
          </div>
        </div>
      </nav>
    </div>
  );
};