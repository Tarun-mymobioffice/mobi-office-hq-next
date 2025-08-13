import Footer from "@/components/footer";
import "./styles/globals.scss";
import Navbar from "@/components/navbaar";
// export const metadata: Metadata = {
//   title: "Cloud ERP for Growing Businesses | MobiOffice",
//   description: "Optimize your business processes with MobiOffice's cloud-based ERP, integrating accounting, inventory, production, and payroll into a unified platform.",
//   keywords: [
//     "cloud ERP",
//     "business integration",
//     "accounting software",
//     "inventory management",
//     "payroll system"
//   ] 
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" />
        <meta name="google-site-verification"  />
      </head>
      <body>
        {/* Wrap the app in the ReduxProvider */}
        <Navbar/>
          {children}
          <Footer/>
      </body>
    </html>
  );
}
