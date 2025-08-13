import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact MobiOffice | Get in Touch",
  description: "Reach out to MobiOffice for support, inquiries, or to schedule a demo. Our team is ready to help you transform your business operations.",
  keywords: [
    "contact MobiOffice",
    "customer support",
    "schedule demo",
    "business inquiry",
    "technical support"
  ],
  openGraph: {
    title: "Contact MobiOffice | Get in Touch",
    description: "Reach out to MobiOffice for support, inquiries, or to schedule a demo. Our team is ready to help you transform your business operations.",
    images: [
      {
        url: "/favicon.svg",
        alt: "MobiOffice Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MobiOffice | Get in Touch",
    description: "Reach out to MobiOffice for support, inquiries, or to schedule a demo. Our team is ready to help you transform your business operations.",
    images: ["/favicon.svg"],
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 