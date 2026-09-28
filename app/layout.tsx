import { Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import Navbar from "@/app/components/frontend/Navbar";
import Footer from '@/app/components/frontend/Footer';
import SmoothScroll from '@/app/components/frontend/SmoothScroll';

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-bengali',
  display: 'swap',
});

export const metadata = {
  title: 'School Management Software BD',
  description: 'স্কুল, কলেজ ও মাদ্রাসার আধুনিক সমাধান',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={notoBengali.variable}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;translate:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-bn bg-light text-body antialiased relative overflow-x-clip">
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}