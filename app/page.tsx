import AcmeLogo from '@/app/ui/acme-logo';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BoltIcon,
  CalendarIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

export default function Page() {
  const year = new Date().getFullYear();
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* CORRECTED LINE: Removed the curly braces {} around AcmeLogo */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-red-600 p-4 md:h-35">
        <AcmeLogo />
      </div>
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-12 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Ship work faster with <span className="text-red-600">Pebble</span>
            </h1>
            <p className="mb-6 max-w-xl text-lg leading-relaxed text-gray-700">
              Pebble is an open‑source task management system for teams. Create tasks, assign owners,
              track status, and keep everyone aligned—with zero vendor lock‑in.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/auth/login?returnTo=/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Get started
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/marci0garcia/pebble"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                View on GitHub
              </a>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-2">
              <li className="inline-flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-emerald-600" /> Assign & track tasks</li>
              <li className="inline-flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-emerald-600" /> Teams & roles (admin/member)</li>
              <li className="inline-flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-emerald-600" /> Status & priority workflows</li>
              {/* <li className="inline-flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-emerald-600" /> Calendar link & reminders</li> */}
            </ul>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <div className="w-full max-w-2xl">
              <Image
                src="/PebbleFront.jpg"
                width={1100}
                height={780}
                priority
                sizes="(min-width: 768px) 42rem, 100vw"
                className="hidden rounded-2xl border shadow md:block"
                alt="Pebble dashboard preview on desktop"
              />
              <Image
                src="/PebbleFront.jpg"
                width={640}
                height={480}
                sizes="100vw"
                className="block rounded-2xl border shadow md:hidden"
                alt="Pebble dashboard preview"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section aria-label="Product statistics" className="border-y bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 text-center md:grid-cols-4">
          <div>
            <p className="text-3xl font-semibold">5x</p>
            <p className="text-sm text-gray-600">Faster planning</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">0$</p>
            <p className="text-sm text-gray-600">Open‑source license</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">∞</p>
            <p className="text-sm text-gray-600">Scales with your team</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Everything you need to move work forward</h2>
          <p className="mt-2 text-gray-700">Opinionated defaults, clean UI, and extensibility so you can customize without fighting the framework.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6 shadow-sm">
            <BoltIcon className="mb-3 h-6 w-6" />
            <h3 className="mb-1 font-semibold">Quick task capture</h3>
            <p className="text-sm text-gray-700">Create tasks with priority, due dates, and assignees in seconds. Keyboard‑friendly and fast.</p>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm">
            <ShieldCheckIcon className="mb-3 h-6 w-6" />
            <h3 className="mb-1 font-semibold">Role‑based access</h3>
            <p className="text-sm text-gray-700">Admin and member roles keep permissions simple while staying secure.</p>
          </div>
           {/* <div className="rounded-2xl border p-6 shadow-sm"> 
            <CalendarIcon className="mb-3 h-6 w-6" />
            <h3 className="mb-1 font-semibold">Calendar friendly</h3>
            <p className="text-sm text-gray-700">Optional Google Calendar iframe for visibility—enable in settings when you’re ready.</p>
          </div>
          */}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">From idea to done</h2>
          <p className="mt-2 text-gray-700">A simple, opinionated flow that keeps teams aligned.</p>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          <li className="rounded-2xl border p-6 shadow-sm">
            <p className="text-sm font-medium text-red-600">Step 1</p>
            <h3 className="mb-1 font-semibold">Create & prioritize</h3>
            <p className="text-sm text-gray-700">Capture tasks with due dates and priority; mark some as Open so anyone can self‑assign.</p>
          </li>
          <li className="rounded-2xl border p-6 shadow-sm">
            <p className="text-sm font-medium text-red-600">Step 2</p>
            <h3 className="mb-1 font-semibold">Assign & track</h3>
            <p className="text-sm text-gray-700">Assign owners, track statuses (Assigned, Due Soon, Finished, Completed), and keep momentum.</p>
          </li>
          <li className="rounded-2xl border p-6 shadow-sm">
            <p className="text-sm font-medium text-red-600">Step 3</p>
            <h3 className="mb-1 font-semibold">Review & ship</h3>
            <p className="text-sm text-gray-700">Close the loop with review, comments, and lightweight activity history.</p>
          </li>
        </ol>
      </section>

      {/* Open Source Callout */}
      <section id="open-source" className="border-y bg-gray-50">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">Open source by design</h2>
            <p className="text-gray-700">Pebble is built with Next.js and Tailwind. Fork it, adapt it, and deploy it on your own stack.</p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/marci0garcia/pebble"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-gray-800 hover:bg-gray-100"
              >
                Explore the repo
              </a>
              <a
                href="/auth/login?returnTo=/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
              >
                Try it now
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="/RocteraSystems.jpg"
              width={900}
              height={620}
              className="rounded-2xl border shadow"
              alt="Task list and statuses in Pebble"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 p-8 text-white shadow-sm md:p-12">
          <h2 className="mb-2 text-2xl font-semibold md:text-3xl">Ready to organize your team?</h2>
          <p className="mb-6 max-w-2xl text-white/90">Sign in with Auth0 and start assigning tasks in minutes. No credit card. No lock‑in.</p>
          <a
            href="/auth/login?returnTo=/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium backdrop-blur transition hover:bg-white/20"
          >
            Log in to Pebble
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 text-sm text-gray-600 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AcmeLogo />
              <span className="sr-only">Pebble</span>
            </div>
            <p className="max-w-xs">An open‑source task manager that keeps teams moving.</p>
          </div>
          <div>
            <p className="mb-2 font-medium text-gray-800">Product</p>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-gray-800">Features</a></li>
              <li><a href="#how" className="hover:text-gray-800">How it works</a></li>
              <li><Link href="/dashboard" className="hover:text-gray-800">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-medium text-gray-800">Resources</p>
            <ul className="space-y-2">
              <li><a href="https://github.com/marci0garcia/pebble" target="_blank" rel="noreferrer noopener" className="hover:text-gray-800">GitHub</a></li>
              <li><a href="/privacy" className="hover:text-gray-800">Privacy</a></li>
              <li><a href="/terms" className="hover:text-gray-800">Terms</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-medium text-gray-800">Sign in</p>
            <ul className="space-y-2">
              <li>
                <a href="/auth/login?returnTo=/dashboard" className="inline-flex items-center gap-2 hover:text-gray-800">
                  Log in
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-gray-500">
            <p>© {year} Pebble. All rights reserved.</p>
            <p>Built with Next.js & Tailwind</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
