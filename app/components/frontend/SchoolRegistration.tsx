"use client";

/**
 * স্কুল রেজিস্ট্রেশন ফর্ম
 * ---------------------------------------------------------------
 * - "সাবডোমেইন চেক করুন" → /api/school/check-subdomain
 *     available হলে সেটাই বেছে নেয়, না হলে suggestion থেকে বেছে নেওয়া যায়
 * - নিজের ডোমেইন দিলে সাবডোমেইন লাগে না; না দিলে সাবডোমেইন বাধ্যতামূলক
 * - "রেজিস্ট্রেশন সম্পন্ন করুন" → /api/school/register
 * (দুটোই app/api/school/[action]/route.ts হয়ে cp.schoolsoftwarebd.com-এ যায়)
 */
import { useState, type FormEvent } from 'react';
import {
  AtSign,
  Building2,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Globe,
  LoaderCircle,
  MapPin,
  Phone,
  RotateCcw,
  School,
  Search,
  Send,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { SCHOOL_TYPES } from '@/app/lib/school-software';
import { smoothScrollTo } from '@/app/components/frontend/SmoothScroll';

/* ------------------------------ types ------------------------------ */
type FormState = {
  school_name: string;
  email: string;
  phone: string;
  full_address: string;
  domain: string;
  subdomain: string;
  type: string;
};
type FieldKey = keyof FormState;
type Suggestion = { subdomain: string; host: string };
type SubdomainCheck =
  | { status: 'idle' }
  | { status: 'checking' }
  | { status: 'available'; host: string; subdomain: string }
  | { status: 'taken'; host: string; suggestions: Suggestion[] }
  | { status: 'error'; message: string };
type ApiResponse = {
  status?: string;
  message?: string;
  data?: Record<string, unknown> & { errors?: Record<string, string[]> };
  errors?: Record<string, string[]>;
};

const EMPTY: FormState = {
  school_name: '',
  email: '',
  phone: '',
  full_address: '',
  domain: '',
  subdomain: '',
  type: SCHOOL_TYPES[0].value,
};

/* ---------------------------- helpers ---------------------------- */
const REGISTRATION_API_BASE_URL = 'https://cp.schoolsoftwarebd.com/api';
const REGISTRATION_ENDPOINT = `${REGISTRATION_API_BASE_URL}/school/register`;

const toEnDigits = (v: string) => v.replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
const normalizePhone = (v: string) => toEnDigits(v).replace(/[\s\-()]/g, '');

const VALIDATE: Partial<Record<FieldKey, (v: string) => string | null>> = {
  school_name: (v) => (v.trim().length >= 3 ? null : 'স্কুলের পূর্ণ নাম লিখুন।'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : 'সঠিক ইমেইল ঠিকানা দিন।'),
  phone: (v) => (/^(?:\+?88)?01[3-9]\d{8}$/.test(normalizePhone(v)) ? null : 'সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)।'),
  domain: (v) =>
    !v.trim() || /^https?:\/\/[^\s/$.?#]+\.[^\s]{2,}$/i.test(v.trim())
      ? null
      : 'ডোমেইন সম্পূর্ণ লিখুন, যেমন: https://example.com',
};

async function postJson(url: string, body: unknown): Promise<ApiResponse & { httpOk: boolean }> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const data: ApiResponse = await res.json().catch(() => ({}));
    return { ...data, httpOk: res.ok };
  } catch {
    return { status: 'error', message: 'সার্ভারের সাথে যোগাযোগ করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।', httpOk: false };
  }
}

/** Laravel ধাঁচের { errors: { field: [msg] } } → { field: msg } */
const pickFieldErrors = (r: ApiResponse) => {
  const raw = r.errors ?? r.data?.errors ?? {};
  return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v[0] : String(v)])) as Partial<
    Record<FieldKey, string>
  >;
};

/* ------------------------------ UI bits ------------------------------ */
const inputCls = (invalid: boolean, withIcon = true) =>
  `w-full rounded-xl border py-3 pr-4 text-[15px] leading-6 text-secondary transition duration-200 placeholder:text-muted focus:bg-white focus:outline-none focus:ring-4 ${
    withIcon ? 'pl-11' : 'pl-4'
  } ${
    invalid
      ? 'border-rose-500 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-500/10'
      : 'border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-primary focus:ring-primary/10'
  }`;

const Label = ({ htmlFor, children, required, hint }: { htmlFor: string; children: React.ReactNode; required?: boolean; hint?: string }) => (
  <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-secondary">
    {children} {required && <span className="text-rose-500">*</span>}
    {hint && <span className="ml-1 text-xs font-normal text-muted">{hint}</span>}
  </label>
);

const FieldError = ({ id, msg }: { id: string; msg?: string | null }) =>
  msg ? (
    <p id={id} className="mt-1.5 text-[13px] text-rose-600">
      {msg}
    </p>
  ) : null;

const IconInput = ({ icon: Icon, invalid, ...props }: { icon: LucideIcon; invalid: boolean } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <Icon className="pointer-events-none absolute left-3.5 top-[15px] h-[18px] w-[18px] text-muted" />
    <input {...props} className={inputCls(invalid)} />
  </div>
);

const STEPS = [
  { title: 'ফর্ম পূরণ করুন', desc: 'স্কুলের নাম, ইমেইল ও মোবাইল নম্বর দিন। ফ্রি সাবডোমেইন বেছে নিন।' },
  { title: 'আমরা যাচাই করব', desc: 'আমাদের প্রতিনিধি তথ্য যাচাই করে আপনার সাথে যোগাযোগ করবেন।' },
  { title: 'অ্যাকাউন্ট চালু', desc: 'আপনার স্কুলের নিজস্ব ড্যাশবোর্ড ও ওয়েবসাইট চালু হয়ে যাবে।' },
];

/* ============================== Component ============================== */
export default function SchoolRegistration() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string | null>>>({});
  const [check, setCheck] = useState<SubdomainCheck>({ status: 'idle' });
  const [selectedHost, setSelectedHost] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [done, setDone] = useState<{ school: string; host: string } | null>(null);

  const set = (field: FieldKey, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: VALIDATE[field]?.(value) ?? null }));
  };

  const blurValidate = (field: FieldKey) => () => {
    if (form[field].trim() && VALIDATE[field]) setErrors((e) => ({ ...e, [field]: VALIDATE[field]!(form[field]) }));
  };

  const onSchoolNameChange = (value: string) => {
    set('school_name', value);
    setForm((f) => ({ ...f, school_name: value, subdomain: '' }));
    setCheck({ status: 'idle' });
    setSelectedHost('');
  };

  const handleCheckSubdomain = async () => {
    const nameErr = VALIDATE.school_name!(form.school_name);
    if (nameErr) {
      setErrors((e) => ({ ...e, school_name: 'সাবডোমেইন চেক করার আগে স্কুলের নাম লিখুন।' }));
      document.getElementById('reg-school_name')?.focus();
      return;
    }

    setCheck({ status: 'checking' });
    setErrors((e) => ({ ...e, subdomain: null }));
    const r = await postJson(`${REGISTRATION_API_BASE_URL}/school/check-subdomain`, { school_name: form.school_name.trim() });

    if (r.status !== 'success' || !r.data) {
      setCheck({ status: 'error', message: r.message || 'সাবডোমেইন চেক করা যায়নি, আবার চেষ্টা করুন।' });
      return;
    }

    const { available, subdomain, host, suggestions } = r.data as {
      available: boolean;
      subdomain: string;
      host: string;
      suggestions?: Suggestion[];
    };

    if (available) {
      setForm((f) => ({ ...f, subdomain }));
      setSelectedHost(host);
      setCheck({ status: 'available', host, subdomain });
    } else {
      setForm((f) => ({ ...f, subdomain: '' }));
      setSelectedHost('');
      setCheck({ status: 'taken', host, suggestions: suggestions ?? [] });
    }
  };

  const chooseSuggestion = (s: Suggestion) => {
    setForm((f) => ({ ...f, subdomain: s.subdomain }));
    setSelectedHost(s.host);
    setErrors((e) => ({ ...e, subdomain: null }));
  };

  const focusField = (field: FieldKey) => {
    const el = document.getElementById(field === 'subdomain' ? 'reg-subdomain-area' : `reg-${field}`);
    if (!el) return;
    smoothScrollTo(el, -140);
    if (field !== 'subdomain') (el as HTMLElement).focus({ preventScroll: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    // ১) field validation
    const next: Partial<Record<FieldKey, string | null>> = {};
    (Object.keys(VALIDATE) as FieldKey[]).forEach((k) => (next[k] = VALIDATE[k]!(form[k])));
    // ২) নিজের ডোমেইন না থাকলে সাবডোমেইন লাগবেই
    if (!form.domain.trim() && !form.subdomain) {
      next.subdomain = 'নিজের ডোমেইন না থাকলে "সাবডোমেইন চেক করুন" বাটনে ক্লিক করে একটি সাবডোমেইন বেছে নিন।';
    }
    setErrors(next);

    const order: FieldKey[] = ['school_name', 'subdomain', 'email', 'phone', 'domain'];
    const first = order.find((k) => next[k]);
    if (first) {
      focusField(first);
      return;
    }

    // ৩) পাঠানো
    setSubmitting(true);
    const payload = {
      school_name: form.school_name.trim(),
      email: form.email.trim(),
      phone: normalizePhone(form.phone),
      full_address: form.full_address.trim(),
      domain: form.domain.trim(),
      subdomain: form.subdomain,
      type: form.type,
    };
    const r = await postJson(REGISTRATION_ENDPOINT, payload);
    setSubmitting(false);

    if (r.status === 'success') {
      setDone({ school: payload.school_name, host: payload.domain || selectedHost });
      setForm(EMPTY);
      setErrors({});
      setCheck({ status: 'idle' });
      setSelectedHost('');
      window.setTimeout(() => {
        const el = document.getElementById('register-card');
        if (el) smoothScrollTo(el, -120);
      }, 50);
      return;
    }

    // server-এর field error গুলো সংশ্লিষ্ট ঘরে দেখাই
    const fieldErrs = pickFieldErrors(r);
    if (Object.keys(fieldErrs).length) {
      setErrors((prev) => ({ ...prev, ...fieldErrs }));
      const firstServer = order.find((k) => fieldErrs[k]);
      if (firstServer) focusField(firstServer);
    }
    // field-ভিত্তিক বাংলা বার্তা থাকলে সেটাই আগে দেখাই (server-এর সাধারণ message অনেক সময় ইংরেজি হয়)
    setFormError(Object.values(fieldErrs)[0] || r.message || 'কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন।');
  };

  const describedBy = (k: FieldKey) => (errors[k] ? `reg-${k}-error` : undefined);

  /* ------------------------------ render ------------------------------ */
  return (
    <section id="register" className="section relative overflow-hidden dot-pattern">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[5fr_8fr] lg:gap-12">
        {/* ---------- left: কীভাবে কাজ করে ---------- */}
        <div data-reveal className="lg:sticky lg:top-32">
          <span className="eyebrow">ফ্রি রেজিস্ট্রেশন</span>
          <h2 className="section-title">স্কুল রেজিস্ট্রেশন ফর্ম</h2>
          <p className="section-desc">নিচের তথ্যগুলো দিন — আমরা যাচাই করে আপনার স্কুলের অ্যাকাউন্ট চালু করে দেব।</p>

          <ol className="relative mt-10 space-y-7 before:absolute before:bottom-3 before:left-[19px] before:top-3 before:w-px before:bg-slate-200">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-4">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-sm font-bold text-primary">
                  {['১', '২', '৩'][i]}
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-secondary">{s.title}</p>
                  <p className="mt-1 text-sm leading-6 text-body">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-body">
            <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
            আপনার তথ্য সম্পূর্ণ নিরাপদ — শুধু অ্যাকাউন্ট চালুর কাজে ব্যবহার হবে।
          </div>
        </div>

        {/* ---------- right: form card ---------- */}
        <div
          id="register-card"
          data-reveal
          style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
          className="relative rounded-3xl border border-slate-200 bg-white p-6 pt-12 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] sm:p-10 sm:pt-14"
        >
          {/* badge — স্ক্রিনশটের সিলের জায়গায় সাইটের স্টাইলে */}
          <div className="absolute -top-6 left-6 rounded-full bg-white p-1.5 shadow-[0_8px_20px_-8px_rgba(15,23,42,0.35)] sm:left-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <School className="h-5 w-5" />
            </span>
          </div>

          {done ? (
            /* ---------- success view ---------- */
            <div className="py-6 text-center" role="status" aria-live="polite">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                <CircleCheck className="h-9 w-9 text-success" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-secondary">রেজিস্ট্রেশন সম্পন্ন হয়েছে!</h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-body">
                <strong className="text-secondary">{done.school}</strong>-এর আবেদন আমরা পেয়েছি। আমাদের একজন প্রতিনিধি শীঘ্রই
                আপনার সাথে যোগাযোগ করবেন।
              </p>
              {done.host && (
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-mono text-sm text-primary">
                  <Globe className="h-4 w-4" /> {done.host}
                </p>
              )}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setDone(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-secondary transition hover:border-primary hover:text-primary"
                >
                  <RotateCcw className="h-4 w-4" /> আরেকটি স্কুল রেজিস্টার করুন
                </button>
              </div>
            </div>
          ) : (
            /* ---------- form ---------- */
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* স্কুলের নাম + সাবডোমেইন */}
                <div className="sm:col-span-2">
                  <Label htmlFor="reg-school_name" required>স্কুলের নাম</Label>
                  <IconInput
                    id="reg-school_name"
                    icon={Building2}
                    invalid={!!errors.school_name}
                    value={form.school_name}
                    onChange={(e) => onSchoolNameChange(e.target.value)}
                    onBlur={blurValidate('school_name')}
                    placeholder="যেমন: ঢাকা মডেল হাই স্কুল"
                    autoComplete="organization"
                    aria-invalid={!!errors.school_name || undefined}
                    aria-describedby={describedBy('school_name')}
                  />
                  <FieldError id="reg-school_name-error" msg={errors.school_name} />

                  {/* সাবডোমেইন এলাকা */}
                  <div
                    id="reg-subdomain-area"
                    className={`mt-3 rounded-xl border p-3.5 transition ${
                      errors.subdomain ? 'border-rose-300 bg-rose-50/50' : 'border-dashed border-slate-200 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCheckSubdomain}
                        disabled={check.status === 'checking'}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-wait disabled:opacity-70"
                      >
                        {check.status === 'checking' ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" /> চেক করা হচ্ছে…
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4" /> সাবডোমেইন চেক করুন
                          </>
                        )}
                      </button>
                      <p className="text-xs leading-5 text-muted">
                        নিজের ডোমেইন থাকলে নিচে দিন — না থাকলে এখানে চেক করে ফ্রি সাবডোমেইন বেছে নিন।
                      </p>
                    </div>

                    <div aria-live="polite">
                      {check.status === 'available' && (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-success/10 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                          <CircleCheck className="h-4 w-4" />
                          <span className="font-mono">{check.host}</span> এভেইলেবল আছে
                        </p>
                      )}

                      {check.status === 'taken' && (
                        <div className="mt-3">
                          <p className="text-sm text-rose-600">
                            <span className="font-mono font-semibold">{check.host}</span> ইতিমধ্যে ব্যবহৃত হচ্ছে।
                            {check.suggestions.length > 0 && ' নিচের যেকোনো একটি বেছে নিন:'}
                          </p>
                          {check.suggestions.length > 0 && (
                            <div role="radiogroup" aria-label="সাবডোমেইন সাজেশন" className="mt-2.5 flex flex-wrap gap-2">
                              {check.suggestions.map((s) => {
                                const active = form.subdomain === s.subdomain;
                                return (
                                  <button
                                    key={s.host}
                                    type="button"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => chooseSuggestion(s)}
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[13px] transition ${
                                      active
                                        ? 'border-primary bg-primary text-white shadow-[0_6px_16px_-6px_rgba(99,102,241,0.7)]'
                                        : 'border-slate-200 bg-white text-secondary hover:border-primary hover:text-primary'
                                    }`}
                                  >
                                    {active && <Check className="h-3.5 w-3.5" />}
                                    {s.host}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {check.status === 'error' && (
                        <p className="mt-3 flex items-start gap-2 text-sm text-rose-600">
                          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {check.message}
                        </p>
                      )}

                      {selectedHost && check.status === 'taken' && (
                        <p className="mt-2.5 text-xs text-muted">
                          নির্বাচিত সাবডোমেইন: <b className="font-mono text-secondary">{selectedHost}</b>
                        </p>
                      )}
                    </div>

                    <FieldError id="reg-subdomain-error" msg={errors.subdomain} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reg-email" required>ইমেইল</Label>
                  <IconInput
                    id="reg-email"
                    type="email"
                    icon={AtSign}
                    invalid={!!errors.email}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    onBlur={blurValidate('email')}
                    placeholder="school@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email || undefined}
                    aria-describedby={describedBy('email')}
                  />
                  <FieldError id="reg-email-error" msg={errors.email} />
                </div>

                <div>
                  <Label htmlFor="reg-phone" required>মোবাইল নম্বর</Label>
                  <IconInput
                    id="reg-phone"
                    type="tel"
                    inputMode="tel"
                    icon={Phone}
                    invalid={!!errors.phone}
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    onBlur={blurValidate('phone')}
                    placeholder="01XXXXXXXXX"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone || undefined}
                    aria-describedby={describedBy('phone')}
                  />
                  <FieldError id="reg-phone-error" msg={errors.phone} />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="reg-full_address">সম্পূর্ণ ঠিকানা</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-[15px] h-[18px] w-[18px] text-muted" />
                    <textarea
                      id="reg-full_address"
                      rows={2}
                      value={form.full_address}
                      onChange={(e) => set('full_address', e.target.value)}
                      placeholder="স্কুলের সম্পূর্ণ ঠিকানা"
                      data-lenis-prevent
                      className={`${inputCls(false)} resize-y`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reg-type">স্কুলের ধরন</Label>
                  <div className="relative">
                    <School className="pointer-events-none absolute left-3.5 top-[15px] h-[18px] w-[18px] text-muted" />
                    <select
                      id="reg-type"
                      value={form.type}
                      onChange={(e) => set('type', e.target.value)}
                      className={`${inputCls(false)} cursor-pointer appearance-none pr-10`}
                    >
                      {SCHOOL_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-[15px] h-[18px] w-[18px] text-muted" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reg-domain" hint="(ঐচ্ছিক)">
                    নিজের ডোমেইন
                  </Label>
                  <IconInput
                    id="reg-domain"
                    type="url"
                    icon={Globe}
                    invalid={!!errors.domain}
                    value={form.domain}
                    onChange={(e) => {
                      set('domain', e.target.value);
                      if (e.target.value.trim()) setErrors((er) => ({ ...er, subdomain: null }));
                    }}
                    onBlur={blurValidate('domain')}
                    placeholder="https://example.com"
                    autoComplete="url"
                    aria-invalid={!!errors.domain || undefined}
                    aria-describedby={describedBy('domain')}
                  />
                  <FieldError id="reg-domain-error" msg={errors.domain} />
                </div>
              </div>

              {formError && (
                <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm text-rose-800">
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">রেজিস্ট্রেশন ব্যর্থ হয়েছে</p>
                    <p className="mt-0.5">{formError}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary mt-8 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {submitting ? (
                  <>
                    পাঠানো হচ্ছে… <LoaderCircle className="h-5 w-5 animate-spin" />
                  </>
                ) : (
                  <>
                    রেজিস্ট্রেশন সম্পন্ন করুন <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}