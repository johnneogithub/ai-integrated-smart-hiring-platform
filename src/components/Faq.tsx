"use client";
import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Is this application free to use?",
    answer: "Yes, this is completely free to use.",
  },
  {
    question: "Can I use it to apply for jobs?",
    answer: "Yes, you can.",
  },
  {
    question: "What is your refund policy? ",
    answer:
      "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
  },
  {
    question: "Do you offer career advice?",
    answer:
      "Yes we do. We have an AI advisor who can help you with your job search. Utilize it to get personalized advice and guidance on your job search.",
  },
];
