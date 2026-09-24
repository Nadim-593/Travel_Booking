/*
 * app/(auth)/register/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * User registration page (/register).
 *
 * CLIENT component — manages form state and validation.
 *
 * Fields:
 *   - Full Name
 *   - Email
 *   - Phone
 *   - Password (with strength indicator)
 *   - Confirm Password
 *   - Terms agreement checkbox
 *
 * Phase 2 will replace the stub with a real authService.register() call.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Full name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[+\d\s\-()]{7,}$/.test(fields.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (!fields.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (!fields.agreed) {
    errors.agreed = "You must agree to the terms to create an account.";
  }
  return errors;
}

// Simple password strength meter
function PasswordStrength({ password }) {
  if (!password) return null;

  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = [
    { label: "Very weak", color: "bg-red-500", width: "w-1/5" },
    { label: "Weak", color: "bg-orange-500", width: "w-2/5" },
    { label: "Fair", color: "bg-yellow-500", width: "w-3/5" },
    { label: "Strong", color: "bg-emerald-400", width: "w-4/5" },
    { label: "Very strong", color: "bg-emerald-600", width: "w-full" },
  ];

  const level = levels[Math.min(strength, 4)];

  return (
    <div className="mt-1">
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${level.color} ${level.width}`}
        />
      </div>
      <p className="text-xs text-slate-400 mt-1">
        Strength: <span className="font-medium text-slate-600">{level.label}</span>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (field) => (e) => {
    const value = field === "agreed" ? e.target.checked : e.target.value;
    setFields((prev) => ({ ...prev, [field]: value }));
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
      await register({
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        password: fields.password,
      });
      router.push("/dashboard");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to create account. Please try again.";
      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="bg-emerald-600 px-7 py-6 text-center">
        <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
        <p className="text-emerald-100 text-sm mt-1">
          Join Deshiyo Travels and start your journey
        </p>
      </div>

      <div className="px-7 py-7">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* API Error */}
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {apiError}
            </div>
          )}

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Rafiqul Islam"
              value={fields.name}
              onChange={handleChange("name")}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
              required
            />
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
          </div>

          {/* Phone */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+880 1700-000000"
            value={fields.phone}
            onChange={handleChange("phone")}
            error={errors.phone}
            icon={<Phone className="w-4 h-4" />}
            hint="We use this to send booking confirmations"
            required
          />

          {/* Password */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
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
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            <PasswordStrength password={fields.password} />
          </div>

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={fields.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
            icon={<Lock className="w-4 h-4" />}
            required
          />

          {/* Terms checkbox */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={fields.agreed}
                onChange={handleChange("agreed")}
                className="mt-0.5 accent-emerald-600 w-4 h-4 flex-shrink-0"
              />
              <span className="text-sm text-slate-600 leading-relaxed">
                I agree to Deshiyo Travels&apos;{" "}
                <a href="#" className="text-emerald-600 hover:underline font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:underline font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.agreed && (
              <p className="text-xs text-red-600 mt-1 ml-7">⚠ {errors.agreed}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create Account
              </>
            )}
          </Button>
        </form>

        {/* Sign in link */}
        <p className="text-center text-sm text-slate-600 mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
