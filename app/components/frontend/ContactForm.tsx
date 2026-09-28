"use client";

/**
 * যোগাযোগ ফর্ম — validation, loading, success/error বার্তা সহ
 * ---------------------------------------------------------------
 * ফর্ম কোথায় যাবে: .env.local ফাইলে লিখুন
 *   NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
 * (Formspree ফ্রি: formspree.io-তে একাউন্ট খুলে ফর্মের URL কপি করুন।
 *  চাইলে নিজের API route-এর URL-ও দিতে পারেন, যেমন /api/contact)
 * Endpoint না থাকলে ফর্ম ভাঙে না — ব্যবহারকারীকে ফোন/ইমেইলে যোগাযোগ করতে বলে।
 */
import { useRef, useState, type FormEvent } from 'react';
import {
  Building2,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mail,
  Phone,
  Send,
  TriangleAlert,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { smoothScrollTo } from '@/app/components/frontend/SmoothScroll';

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '';

const TOPICS = ['সফটওয়্যার ডেমো', 'প্রাইসিং/প্যাকেজ', 'পার্টনারশিপ', 'অন্যান্য'];

type Field = 'name' | 'phone' | 'email' | 'message';

// বাংলা সংখ্যা → ইংরেজি, স্পেস/ড্যাশ বাদ
const normalizePhone = (v: string) =>
  v.replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d))).replace(/[\s\-()]/g, '');

const RULES: Record<Field, (v: string) => boolean> = {
  name: (v) => v.trim().length >= 2,
  phone: (v) => /^(?:\+?88)?01[3-9]\d{8}$/.test(normalizePhone(v)),
  email: (v) => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  message: (v) => v.trim().length >= 10,
};

const ERRORS: Record<Field, string> = {
  name: 'অনুগ্রহ করে আপনার নাম লিখুন।',
  phone: 'সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)।',
  email: 'সঠিক ইমেইল ঠিকানা দিন।',
  message: 'অনুগ্রহ করে অন্তত ১০ অক্ষরের একটি বার্তা লিখুন।',
};

type Status = { type: 'success' | 'error' | 'warning'; text: React.ReactNode } | null;

const inputCls = (invalid: boolean, withIcon = true) =>
  `w-full rounded-xl border py-3 pr-4 text-[15px] leading-6 text-secondary transition duration-200 placeholder:text-muted focus:bg-white focus:outline-none focus:ring-4 ${
    withIcon ? 'pl-11' : 'pl-4'
  } ${
    invalid
      ? 'border-rose-500 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-500/10'
      : 'border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-primary focus:ring-primary/10'
  }`;

const Label = ({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) => (
  <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-secondary">
    {children} {required && <span className="text-rose-500">*</span>}
  </label>
);

const ErrorText = ({ id, show, children }: { id: string; show: boolean; children: React.ReactNode }) =>
  show ? (
    <p id={id} className="mt-1.5 text-[13px] text-rose-600">
      {children}
    </p>
  ) : null;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const validateField = (name: Field, value: string) => setErrors((e) => ({ ...e, [name]: !RULES[name](value) }));

  // ভুল থাকা অবস্থায় টাইপ করলে সাথে সাথে ঠিক/ভুল দেখায়; blur-এ খালি না হলে যাচাই
  const fieldProps = (name: Field) => ({
    name,
    id: name,
    'aria-invalid': errors[name] || undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (errors[name]) validateField(name, e.target.value);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target.value.trim() !== '') validateField(name, e.target.value);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Partial<Record<Field, boolean>> = {};
    (Object.keys(RULES) as Field[]).forEach((f) => (next[f] = !RULES[f](String(data.get(f) ?? ''))));
    setErrors(next);

    const firstInvalid = (Object.keys(RULES) as Field[]).find((f) => next[f]);
    if (firstInvalid) {
      const el = form.elements.namedItem(firstInvalid) as HTMLElement | null;
      if (el) {
        smoothScrollTo(el, -140);
        el.focus({ preventScroll: true });
      }
      return;
    }

    if (!ENDPOINT) {
      setStatus({
        type: 'warning',
        text: (
          <>
            ফর্মটি এখনো সার্ভারের সাথে যুক্ত করা হয়নি। অনুগ্রহ করে{' '}
            <a href="tel:+8801857770000" className="font-semibold underline">
              ফোন
            </a>{' '}
            বা{' '}
            <a href="mailto:info@schoolsoftwarebd.com" className="font-semibold underline">
              ইমেইলে
            </a>{' '}
            যোগাযোগ করুন।
          </>
        ),
      });
      console.warn('ContactForm: NEXT_PUBLIC_CONTACT_ENDPOINT সেট করা নেই — ফর্ম কোথাও পাঠানো হয়নি।');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setErrors({});
      setStatus({
        type: 'success',
        text: (
          <>
            <strong>ধন্যবাদ!</strong> আপনার বার্তা পেয়েছি। আমাদের প্রতিনিধি খুব শীঘ্রই যোগাযোগ করবেন।
          </>
        ),
      });
    } catch {
      setStatus({ type: 'error', text: 'দুঃখিত, বার্তা পাঠানো যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সরাসরি ফোন করুন।' });
    } finally {
      setLoading(false);
    }
  };

  const inputWithIcon = (name: Field | 'institution', Icon: LucideIcon, props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const invalid = name !== 'institution' && !!errors[name as Field];
    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-[15px] h-[18px] w-[18px] text-muted" />
        <input
          {...(name !== 'institution' ? fieldProps(name as Field) : { name, id: name })}
          {...props}
          className={inputCls(invalid)}
        />
      </div>
    );
  };

  const statusStyle = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    error: 'border-rose-200 bg-rose-50 text-rose-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-800',
  };
  const StatusIcon = status?.type === 'success' ? CircleCheck : status?.type === 'error' ? CircleAlert : TriangleAlert;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>আপনার নাম</Label>
          {inputWithIcon('name', UserRound, { type: 'text', placeholder: 'যেমন: রাকিব হাসান', autoComplete: 'name' })}
          <ErrorText id="name-error" show={!!errors.name}>{ERRORS.name}</ErrorText>
        </div>
        <div>
          <Label htmlFor="phone" required>ফোন নম্বর</Label>
          {inputWithIcon('phone', Phone, { type: 'tel', inputMode: 'tel', placeholder: '01XXX-XXXXXX', autoComplete: 'tel' })}
          <ErrorText id="phone-error" show={!!errors.phone}>{ERRORS.phone}</ErrorText>
        </div>
        <div>
          <Label htmlFor="email">ইমেইল ঠিকানা</Label>
          {inputWithIcon('email', Mail, { type: 'email', placeholder: 'example@email.com', autoComplete: 'email' })}
          <ErrorText id="email-error" show={!!errors.email}>{ERRORS.email}</ErrorText>
        </div>
        <div>
          <Label htmlFor="institution">প্রতিষ্ঠানের নাম</Label>
          {inputWithIcon('institution', Building2, { type: 'text', placeholder: 'স্কুল/কলেজের নাম', autoComplete: 'organization' })}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 block text-sm font-semibold text-secondary">যোগাযোগের বিষয়</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TOPICS.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="peer sr-only" />
              <span className="flex h-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center text-sm font-medium text-body transition duration-200 hover:border-primary/40 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/15">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Label htmlFor="message" required>আপনার বার্তা</Label>
        <textarea
          {...fieldProps('message')}
          rows={5}
          placeholder="বিস্তারিত লিখুন..."
          data-lenis-prevent
          className={`${inputCls(!!errors.message, false)} resize-y`}
        />
        <ErrorText id="message-error" show={!!errors.message}>{ERRORS.message}</ErrorText>
      </div>

      {/* honeypot — spam bot এটা পূরণ করে, মানুষ দেখে না */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-[0_12px_30px_-10px_rgba(99,102,241,0.7)] transition duration-300 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'পাঠানো হচ্ছে...' : 'বার্তা প্রেরণ করুন'}
        {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      </button>

      {/* success / error বার্তা — smooth ভাবে খোলে */}
      <div
        role="status"
        aria-live="polite"
        className={`grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          status ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          {status && (
            <div className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${statusStyle[status.type]}`}>
              <StatusIcon className="mt-0.5 h-5 w-5 shrink-0" />
              <div>{status.text}</div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}