"use client";

import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

import { useRef, useEffect, useState } from "react";
import { benefitOne, benefitTwo } from "@/components/data";
import { ActiveSectionContext } from "@/components/navigation/ActiveSectionContext";
import BackToTopButton from "@/components/navigation/BackToTopButton";

export default function LandingClient() {
  // Refs (declare ONCE)
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Active section for scroll-spy
  const [activeSection, setActiveSection] = useState<
    "hero" | "benefits" | "testimonials" | "faq"
  >("hero");
  

  // Handle hash scrolling (navbar clicks + refresh)
    const scrollFromHash = () => {
    const hash = window.location.hash;
    const offset = 100; // navbar height

    if (hash === "#benefits" && benefitsRef.current) {
        smoothScrollTo(benefitsRef.current.offsetTop - offset, 800);
    }

    if (hash === "#testimonials" && testimonialsRef.current) {
        smoothScrollTo(testimonialsRef.current.offsetTop - offset, 800);
    }

    if (hash === "#faq" && faqRef.current) {
        smoothScrollTo(faqRef.current.offsetTop - offset, 800);
    }
    };

    const smoothScrollTo = (targetY: number, duration = 600) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(
        0,
        startY + distance * easeInOut(progress)
        );

        if (progress < 1) {
        requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
    };


    useEffect(() => {
        const handleHashChange = () => {
            scrollFromHash();
        };

        window.addEventListener("hashchange", handleHashChange);
        return () =>
            window.removeEventListener("hashchange", handleHashChange);
        }, []);

        
    useEffect(() => {
        const handleHashChange = () => scrollFromHash();

        window.addEventListener("hashchange", handleHashChange);
        return () =>
            window.removeEventListener("hashchange", handleHashChange);
        }, []);

    // Debounced scroll‑spy
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        const handleScroll = () => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            const sections = [
            { id: "hero", ref: heroRef },
            { id: "benefits", ref: benefitsRef },
            { id: "testimonials", ref: testimonialsRef },
            { id: "faq", ref: faqRef },
            ];

            const scrollPosition = window.scrollY + 120;

            for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i].ref.current;
            if (section && section.offsetTop <= scrollPosition) {
                setActiveSection(sections[i].id as any);
                break;
            }
            }
        }, 60);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <>
        <ActiveSectionContext.Provider value={activeSection}>
                <Container>
                    {/* Hero */}
                    <div ref={heroRef} id="hero">
                    <Hero />
                    </div>

                    <div
                        ref={benefitsRef}
                        id="benefits"
                        className="scroll-offset"
                        >

                        <SectionTitle
                            preTitle="Smart Hiring Platform"
                            title="Why should you choose us?"
                        >
                            Smart Hiring Platform is an AI-driven hiring platform that helps you
                            find the best candidates for your job.
                        </SectionTitle>

                        <Benefits data={benefitOne} />
                        <Benefits imgPos="right" data={benefitTwo} />
                    </div>

                    <SectionTitle preTitle="Watch a video" title="Learn how it works">
                    Grow your business with our AI-driven hiring platform.
                    </SectionTitle>

                    <Video videoId="fZ0D0cnR88E" />

                    {/*Testimonials */}
                    <div
                    ref={testimonialsRef}
                    id="testimonials"
                    className="scroll-offset"
                    >
                    <SectionTitle
                        preTitle="Testimonials"
                        title="Here's what our customers said"
                    />
                    <Testimonials />
                    </div>

                    {/* FAQ */}
                    <div ref={faqRef} id="faq" className="scroll-offset">
                    <SectionTitle preTitle="FAQ" title="Frequently Asked Questions" />
                    <Faq />
                    </div>

                    <Cta />
                </Container>
            </ActiveSectionContext.Provider>
        <BackToTopButton />
    </>
  );

}
