import FaqPage from "@/components/faqs";
import HeroSection from "@/components/hero-section";
import Marquee from "@/components/marquee";
import MidSection from "@/components/mid-section";
import TestimonialCards from "@/components/testimonial";
import { Int_AccordionItem } from "@/models/types";

const FAQS: Int_AccordionItem[] = [
  {
    id: 1,
    question: "What is the learning curve for using DoubleTick?",
    answer:
      "DoubleTick is designed to be user-friendly and intuitive, making it easy for your team to get started. The platform provides comprehensive documentation and support resources to help you learn and use DoubleTick effectively.",
  },
  {
    id: 2,
    question: "Can I set reminders and notifications for tasks?",
    answer: "Yes, you can set reminders and notifications to ensure you and your team stay on track and meet deadlines.",
  },
  {
    id: 3,
    question: "How secure is my data in your task management system?",
    answer: "We prioritize data security with encryption, secure access controls, and regular backups to protect your information.",
  },
  {
    id: 4,
    question: "Can DoubleTick integrate with other tools I'm using, such as email and CRM software?",
    answer: "DoubleTick offers seamless integration with popular business tools, allowing you to streamline your workflows and avoid duplicate data entry.",
  },
];


export default function Home() {
  return (
    <>
    <HeroSection
    title="AI First Operating System"
    subtitle="for your Growing Business."
    description="MobiOffice HQ unifies ERP, CRM, procurement, maintenance, assets, payroll and more so you run faster, see clearer, and control everything from one place."
    primaryBtnText="Create My HQ"
    primaryBtnLink="/create-hq"
    secondaryBtnText="See How It Works"
    secondaryBtnLink="/how-it-works"
    imageSrc="/hero.svg"
    imageAlt="AI Dashboard"
  />
  <Marquee />
  <MidSection />
  <TestimonialCards />
  <FaqPage
  ACCORDION_DATA={FAQS}
  TITLE="Frequently Asked Questions"
/>
  </>
  );
}
