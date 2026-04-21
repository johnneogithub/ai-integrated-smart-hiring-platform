import { Container } from "@/landing/Container";
import { Hero } from "@/landing/Hero";
import { SectionTitle } from "@/landing/SectionTitle";
import { Benefits } from "@/landing/Benefits";
import { Video } from "@/landing/Video";
import { Testimonials } from "@/landing/Testimonials";
import { Faq } from "@/landing/Faq";
import { Cta } from "@/landing/Cta";

import { benefitOne, benefitTwo } from "@/landing/data";
export default function Home() {
  return (
    <Container>
      <Hero />
      <SectionTitle
        preTitle="Smart Hiring Platform"
        title=" Why should you choose us?"
      >
        Smart Hiring Platform is an AI-driven hiring platform that helps you to find the best candidates for your job. 
        We use AI to analyze the candidates and provide you with the best match for your job. 
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        preTitle="Watch a video"
        title="Learn how to fullfil your needs"
      >
        Grow your business with our AI-driven hiring platform. Watch the video to learn how to find the best candidates for your job and save time and money.
      </SectionTitle>

      <Video videoId="fZ0D0cnR88E" />

      <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Some of the testimonials from our customers who have used our platform to find the best candidates for their jobs. We are proud to have helped them to grow their business and find the best talent for their team.
      </SectionTitle>

      <Testimonials />

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Questions about our platform? We are here to help you. If you have any questions, please feel free to contact us. We will be happy to answer your questions and help you to find the best candidates for your job.
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}
