/*
 * app/contact/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Contact Us page (/contact).
 *
 * This is a CLIENT component because the form uses useState for validation.
 *
 * Sections:
 *   1. Page header
 *   2. Left: contact info cards
 *   3. Right: validated contact form
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Simple front-end validation
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Your name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.subject.trim()) errors.subject = "Please enter a subject.";
  if (!fields.message.trim()) {
    errors.message = "Message cannot be empty.";
  } else if (fields.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: ["House 12, Road 5, Dhanmondi 15", "Dhaka 1209, Bangladesh"],
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    lines: ["+880 1700-000000", "+880 1800-000000"],
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@deshiyotravels.com", "support@deshiyotravels.com"],
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Sun – Thu: 9:00 AM – 6:00 PM", "Fri – Sat: 10:00 AM – 4:00 PM"],
    color: "bg-purple-100 text-purple-700",
  },
];

export default function ContactPage() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear that field's error as soon as user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate submission (real API call in future)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-slate-900 py-14">
        <div className="container-custom text-center">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Contact Deshiyo Travels
          </h1>
          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            Planning a trip? Have a custom group request? We&apos;d love to hear from
            you. Our team typically replies within a few hours.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Contact Info Column ──────────────────────────────────────── */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Our Contact Details
            </h2>
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 border border-slate-200 rounded-xl hover:border-emerald-200 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1">
                    {item.title}
                  </h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-sm text-slate-500">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Contact Form Column ──────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {submitted ? (
              /* ── Success State ───────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center text-center py-16 bg-emerald-50 border border-emerald-200 rounded-2xl h-full">
                <CheckCircle className="w-14 h-14 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-slate-600 text-sm max-w-xs leading-relaxed">
                  Thank you, <strong>{fields.name}</strong>! Our team will get
                  back to you at <strong>{fields.email}</strong> within a few
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFields({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="mt-6 text-sm text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-900 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* ── Form ────────────────────────────────────────────────── */
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5"
                noValidate
              >
                <h2 className="text-lg font-bold text-slate-900">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Rafiqul Islam"
                    value={fields.name}
                    onChange={handleChange("name")}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={fields.email}
                    onChange={handleChange("email")}
                    error={errors.email}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+880 1700-000000"
                    value={fields.phone}
                    onChange={handleChange("phone")}
                    hint="Optional — for faster response"
                  />
                  <Input
                    label="Subject"
                    placeholder="Custom group tour inquiry"
                    value={fields.subject}
                    onChange={handleChange("subject")}
                    error={errors.subject}
                    required
                  />
                </div>

                {/* Message textarea */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your trip idea, preferred dates, group size..."
                    value={fields.message}
                    onChange={handleChange("message")}
                    className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-colors resize-none focus:outline-none focus:ring-2 placeholder:text-slate-400 ${
                      errors.message
                        ? "border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-400"
                        : "border-slate-300 focus:ring-emerald-100 focus:border-emerald-500"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600">⚠ {errors.message}</p>
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
