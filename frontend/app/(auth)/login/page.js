/*
 * app/(auth)/login/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Login page (/login).
 *
 * WHY Suspense wrapper?
 *   useSearchParams() reads from the URL query string (e.g., ?message=...).
 *   In Next.js App Router, any component using useSearchParams() must be
 *   wrapped in a <Suspense> boundary for static pre-rendering to work.
 *   We split the page into LoginForm (client) + a Suspense wrapper (this file).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Suspense } from "react";
import LoginForm from "./LoginForm";
import Loader from "@/components/ui/Loader";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Deshiyo Travels account to manage bookings and explore tours.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader type="page" text="Loading..." />}>
      <LoginForm />
    </Suspense>
  );
}
