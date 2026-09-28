"use client"

import {
    Mail,
    MapPin,
    Phone,
    Rocket
} from 'lucide-react';


const Footer = () => {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      {/* CTA Section */}
      <div className="container-x section">
        <div className="section-head">
          <h2 className="text-[30px] font-bold leading-[1.3] text-white md:text-4xl">
            আপনার শিক্ষা প্রতিষ্ঠানকে ডিজিটাল রূপান্তর করতে প্রস্তুত?
          </h2>
          <p className="section-desc text-[#9CA3AF]">
            আজই আমাদের সাথে যোগাযোগ করুন এবং ১ মাসের ফ্রি ট্রায়াল উপভোগ করুন।
          </p>
          <a href="#" className="btn btn-primary mt-10">
            এখনই ডেমো রিকোয়েস্ট করুন <Rocket className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Footer Multi-column Section */}
      <div className="container-x">
        <div className="grid gap-10 pb-14 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <a href="#top" className="flex items-center gap-1.5">
              <svg className="h-9 w-9" viewBox="0 0 40 40" fill="none">
                <path d="M20 4l14 8v4H6v-4l14-8z" fill="#1e7a8c" />
                <rect x="9" y="17" width="4" height="13" fill="#2f9aa8" />
                <rect x="18" y="17" width="4" height="13" fill="#2f9aa8" />
                <rect x="27" y="17" width="4" height="13" fill="#2f9aa8" />
                <rect x="5" y="31" width="30" height="3" rx="1" fill="#3b82f6" />
                <path d="M5 36c5-3 10 2 15-1s10 2 15-1" stroke="#3b82f6" strokeWidth="1.5" />
              </svg>
              <div className="leading-none">
                <p className="text-[15px] font-bold text-[#2f9aa8]">
                  SchoolSoftware<span className="text-blue-500">BD</span>
                </p>
                <p className="mt-0.5 text-[9px] text-[#9CA3AF]">www.schoolsoftwarebd.com</p>
              </div>
            </a>
            <p className="mt-5 text-sm text-[#9CA3AF]">
              <span className="font-semibold text-slate-300">“School SoftwareBD”</span> বাংলাদেশের স্কুল, কলেজ, মাদ্রাসা ও কোচিং সেন্টারের জন্য তৈরি একটি ক্লাউড-ভিত্তিক School Management Software। ভর্তি থেকে রেজাল্ট, ফি কালেকশন থেকে স্টাফ ম্যানেজমেন্ট — সব এক জায়গায়। সম্পূর্ণ বাংলায়। বাংলাদেশের বাস্তবতার কথা মাথায় রেখে।
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9CA3AF]/60 text-[#9CA3AF] transition hover:border-[#6366F1] hover:text-[#6366F1]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-1.56 19.88v-7H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v7A10 10 0 0 0 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9CA3AF]/60 text-[#9CA3AF] transition hover:border-[#6366F1] hover:text-[#6366F1]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9CA3AF]/60 text-[#9CA3AF] transition hover:border-[#6366F1] hover:text-[#6366F1]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* About Links */}
          <div className="lg:pl-10">
            <h3 className="text-base font-bold text-white">আমাদের সম্পর্কে</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#9CA3AF]">
              <li>
                <a href="#top" className="transition hover:text-[#6366F1]">
                  মূল পাতা
                </a>
              </li>
              <li>
                <a href="#modules" className="transition hover:text-[#6366F1]">
                  মডিউল
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-[#6366F1]">
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#6366F1]">
                  রিটার্ন এবং রিফান্ড নীতি
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#6366F1]">
                  গোপনীয়তা নীতি
                </a>
              </li>
            </ul>
          </div>

          {/* Features Links */}
          <div className="lg:pl-6">
            <h3 className="text-base font-bold text-white">বৈশিষ্ট্য</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#9CA3AF]">
              <li>
                <a href="#" className="transition hover:text-[#6366F1]">
                  ব্যবহার করা সহজ
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#6366F1]">
                  সবসময় আপ টু ডেট
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#6366F1]">
                  ডিজিটাল হাজিরা সিস্টেম
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#6366F1]">
                  শিক্ষার্থীদের পড়াশোনার বেতন আদায়
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#6366F1]">
                  ইন্টিগ্রেটেড এসএমএস
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:pl-6">
            <h3 className="text-base font-bold text-white">যোগাযোগের তথ্য</h3>
            <ul className="mt-5 space-y-4 text-sm text-[#9CA3AF]">
              <li className="flex gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#6366F1]" />
                <span>Sahara Center, 37/A, Lift 16, VIP Road, Kakrail, Dhaka</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-[#6366F1]" />
                <a href="mailto:info@schoolsoftwarebd.com" className="transition hover:text-[#6366F1]">
                  info@schoolsoftwarebd.com
                </a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[#6366F1]" />
                <a href="tel:+8801857770000" className="transition hover:text-[#6366F1]">
                  +৮৮০ ১৮৫৭ ৭৭০০০০
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-400/40 py-6 text-center text-[13px] text-[#9CA3AF]">
          কপিরাইট © ২০১০ – ২০২৬, School SoftwareBD | স্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer