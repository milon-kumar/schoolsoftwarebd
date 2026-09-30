/**
 * ডেমো ও রেজিস্ট্রেশনের সব সেটিং এক জায়গায়।
 * URL বদলাতে .env.local-এ লিখুন:
 *   NEXT_PUBLIC_DEMO_BASE_URL=https://demo.schoolsoftwarebd.com
 *   SCHOOL_API_BASE_URL=https://cp.schoolsoftwarebd.com/api      (শুধু server-এ ব্যবহার হয়)
 */

export const DEMO_BASE_URL = (process.env.NEXT_PUBLIC_DEMO_BASE_URL ?? 'https://demo.schoolsoftwarebd.com').replace(/\/$/, '');

export type DemoRoleKey = 'school-portal' | 'admin' | 'teacher' | 'student';

export type DemoRole = {
  key: DemoRoleKey;
  title: string;
  subtitle: string;
  /** লগইন লাগলে ইউজারনেম/পাসওয়ার্ড, না লাগলে সরাসরি path */
  username?: string;
  password?: string;
  path?: string;
};

export const DEMO_ROLES: DemoRole[] = [
  {
    key: 'school-portal',
    title: 'School Portal',
    subtitle: 'পাবলিক স্কুল ওয়েবসাইট, নোটিশ ও ভর্তি তথ্য',
    path: '/home',
  },
  {
    key: 'admin',
    title: 'Admin Dashboard',
    subtitle: 'শিক্ষার্থী, শিক্ষক, ফি ও রিপোর্ট নিয়ন্ত্রণ',
    username: 'superadmin@gmail.com',
    password: '123456',
  },
  {
    key: 'teacher',
    title: 'Teacher Dashboard',
    subtitle: 'হাজিরা নেওয়া, নম্বর ও রেজাল্ট এন্ট্রি',
    username: 'teacher@email.com',
    password: '123456',
  },
  {
    key: 'student',
    title: 'Student Dashboard',
    subtitle: 'রুটিন, রেজাল্ট ও নোটিশ দেখা',
    username: 'student@email.com',
    password: '123456',
  },
];

/** ডেমো সাইটের পূর্ণ URL — লগইন রোল হলে credentials সহ /login-এ যায় */
export function demoUrl(role: DemoRole): string {
  if (!role.username || !role.password) return `${DEMO_BASE_URL}${role.path ?? '/'}`;
  const params = new URLSearchParams({ role: role.key, username: role.username, password: role.password });
  return `${DEMO_BASE_URL}/login?${params.toString()}`;
}

export const SCHOOL_TYPES = [
  { value: 'primary', label: 'প্রাথমিক বিদ্যালয়' },
  { value: 'secondary', label: 'মাধ্যমিক বিদ্যালয়' },
  { value: 'higher_secondary', label: 'উচ্চ মাধ্যমিক বিদ্যালয়' },
  { value: 'school_and_college', label: 'স্কুল ও কলেজ' },
  { value: 'madrasa', label: 'মাদ্রাসা' },
  { value: 'kindergarten', label: 'কিন্ডারগার্টেন' },
  { value: 'technical', label: 'কারিগরি বিদ্যালয়' },
  { value: 'specialized', label: 'বিশেষায়িত বিদ্যালয়' },
] as const;

/** নতুন রেজিস্ট্রেশনের status — server-এ বসানো হয়, browser থেকে বদলানো যায় না */
export const ACTIVE_STATUS_DEFAULT = 3;