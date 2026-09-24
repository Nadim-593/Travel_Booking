/*
 * app/(auth)/login/LoginForm.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The actual login form — extracted to allow the page to wrap it in Suspense.
 * useSearchParams() is safe here because this component is rendered inside
 * a <Suspense> boundary provided by the parent page.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

function validate(fields) {
  const errors = {};
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectMessage = searchParams.get("message");
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const { login } = useAuth();

  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setApiError("");

    try {
      await login(fields.email, fields.password);
      router.push(redirectPath);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to sign in. Please check your credentials.";
      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="bg-emerald-600 px-7 py-6 text-center">
        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
        <p className="text-emerald-100 text-sm mt-1">
          Sign in to your Deshiyo Travels account
        </p>
      </div>

      <div className="px-7 py-7">
        {/* Redirect message (e.g. from booking widget) */}
        {redirectMessage && (
          <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 flex items-start gap-2">
            <span className="mt-0.5">ℹ</span>
            {redirectMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {apiError}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={handleChange("email")}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              value={fields.password}
              onChange={handleChange("password")}
              error={errors.password}
              icon={<Lock className="w-4 h-4" />}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-[36px] text-slate-400 hover:text-slate-700 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-right">
            <a href="#" className="text-xs text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
              Forgot your password?
            </a>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors">
            Create one — it&apos;s free
          </Link>
        </p>
      </div>
    </div>
  );
}
