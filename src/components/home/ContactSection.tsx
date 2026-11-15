"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Mail, MapPin, Send, CheckCircle2, Sparkles, Phone } from "lucide-react";
import confetti from "canvas-confetti";
import { SITE_CONTENT } from "@/content/site";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/utils";

export default function ContactSection() {
  const { contact, brand } = SITE_CONTENT;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: contact.enquiryTypes[0],
    preferredDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionChannel, setSubmissionChannel] = useState<"whatsapp" | "email">("whatsapp");

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please share a brief note about your vision";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionChannel("whatsapp");
    setIsSubmitted(true);

    // Trigger luxury floral confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#F4B9A0", "#E8A93B", "#B78AA8", "#E58FA0", "#FBF4E6"],
    });

    const url = buildWhatsAppUrl({
      name: formData.name,
      service: formData.enquiryType,
      date: formData.preferredDate,
      notes: `${formData.message} (Email: ${formData.email}, Phone: ${formData.phone || "N/A"})`,
    });

    // Open WhatsApp
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 400);
  };

  const handleEmailFallback = () => {
    if (!validateForm()) return;

    setSubmissionChannel("email");
    setIsSubmitted(true);

    const mailto = buildMailtoUrl({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.enquiryType,
      date: formData.preferredDate,
      notes: formData.message,
    });

    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-16 sm:py-28 md:py-36 bg-ink-aubergine text-butter-cream overflow-hidden">
      {/* Background radial glow & night garden atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(74,31,61,0.55)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(232,169,59,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 text-apricot-blush text-[9.5px] sm:text-xs uppercase font-sans tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
            <span>Night Garden Atmosphere</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-butter-cream leading-tight">
            {contact.headlineLine1} <br />
            <span className="italic font-serif text-apricot-blush">
              {contact.headlineLine2}
            </span>
          </h2>

          <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-light text-butter-cream/80 leading-relaxed max-w-xl mx-auto">
            {contact.description}
          </p>
        </div>

        {/* Content Grid: Form on Left/Center, Concierge Contacts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Main Interactive Form Card */}
          <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleWhatsAppSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase font-sans tracking-[0.2em] text-butter-cream/70 mb-1.5 sm:mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 sm:px-4 py-3 text-butter-cream placeholder:text-butter-cream/35 text-base sm:text-sm focus:outline-none focus:border-marigold-glow transition-colors"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase font-sans tracking-[0.2em] text-butter-cream/70 mb-1.5 sm:mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@example.com"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 sm:px-4 py-3 text-butter-cream placeholder:text-butter-cream/35 text-base sm:text-sm focus:outline-none focus:border-marigold-glow transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase font-sans tracking-[0.2em] text-butter-cream/70 mb-1.5 sm:mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 sm:px-4 py-3 text-butter-cream placeholder:text-butter-cream/35 text-base sm:text-sm focus:outline-none focus:border-marigold-glow transition-colors"
                      />
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-[11px] sm:text-xs uppercase font-sans tracking-[0.2em] text-butter-cream/70 mb-1.5 sm:mb-2">
                        Preferred Date / Timeline
                      </label>
                      <input
                        type="text"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        placeholder="e.g. Autumn 2026 or Dec 15"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 sm:px-4 py-3 text-butter-cream placeholder:text-butter-cream/35 text-base sm:text-sm focus:outline-none focus:border-marigold-glow transition-colors"
                      />
                    </div>
                  </div>

                  {/* Enquiry Type Selector */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase font-sans tracking-[0.2em] text-butter-cream/70 mb-1.5 sm:mb-2">
                      Nature of Enquiry
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full bg-ink-aubergine border border-white/20 rounded-xl px-3.5 sm:px-4 py-3 text-butter-cream text-base sm:text-sm focus:outline-none focus:border-marigold-glow"
                    >
                      {contact.enquiryTypes.map((type, i) => (
                        <option key={i} value={type} className="bg-ink-aubergine text-butter-cream">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase font-sans tracking-[0.2em] text-butter-cream/70 mb-1.5 sm:mb-2">
                      Your Vision, Color Desires &amp; Space Notes *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the venue, mood, guest count, and any favorite flowers you hold dear..."
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 sm:px-4 py-3 text-butter-cream placeholder:text-butter-cream/35 text-base sm:text-sm focus:outline-none focus:border-marigold-glow transition-colors"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Actions: Mobile-first Stack */}
                  <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-marigold-glow text-ink-aubergine font-sans text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold hover:bg-white transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4 fill-ink-aubergine stroke-none" />
                      <span>Send Enquiry via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmailFallback}
                      className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-butter-cream font-sans text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Or Email Direct</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Elegant Floral Confirmation Screen */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 sm:py-12 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-marigold-glow/20 text-marigold-glow flex items-center justify-center mb-4 sm:mb-6">
                    <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8 text-marigold-glow" />
                  </div>

                  <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-apricot-blush font-semibold">
                    Enquiry Prepared
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-butter-cream font-light mt-2">
                    Your petals are on their way. 🌸
                  </h3>

                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-sans font-light text-butter-cream/80 max-w-md leading-relaxed">
                    Thank you for reaching out to THE PETAL MUSE. Your details have been formatted for{" "}
                    {submissionChannel === "whatsapp" ? "WhatsApp" : "direct email"}. Jensi Dholariya will review your vision with the utmost care.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 sm:mt-8 px-6 py-3 rounded-full border border-white/20 text-xs font-sans tracking-widest uppercase text-butter-cream/70 hover:text-butter-cream hover:border-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Atelier Concierge Cards */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-5">
            {/* WhatsApp Card */}
            <a
              href={buildWhatsAppUrl({ occasion: "Direct Concierge Chat" })}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-marigold-glow/50 transition-all duration-300 flex items-start gap-3.5 sm:gap-4 group active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 fill-[#25D366] stroke-none" />
              </div>
              <div>
                <span className="text-[9.5px] sm:text-[10px] font-sans uppercase tracking-widest text-butter-cream/50">
                  Instant Message
                </span>
                <p className="font-serif text-base sm:text-lg text-butter-cream group-hover:text-marigold-glow transition-colors">
                  WhatsApp Concierge
                </p>
                <p className="text-[11px] sm:text-xs text-butter-cream/70 font-sans mt-0.5">
                  Direct conversation with Jensi Dholariya
                </p>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-marigold-glow/50 transition-all duration-300 flex items-start gap-3.5 sm:gap-4 group active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-full bg-peony-rose/20 text-peony-rose flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9.5px] sm:text-[10px] font-sans uppercase tracking-widest text-butter-cream/50">
                  Instagram Direct
                </span>
                <p className="font-serif text-base sm:text-lg text-butter-cream group-hover:text-marigold-glow transition-colors">
                  {brand.instagramHandle}
                </p>
                <p className="text-[11px] sm:text-xs text-butter-cream/70 font-sans mt-0.5">
                  Daily atelier stories &amp; recent captures
                </p>
              </div>
            </a>

            {/* Email Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-butter-cream/10 text-butter-cream flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9.5px] sm:text-[10px] font-sans uppercase tracking-widest text-butter-cream/50">
                  Official Email
                </span>
                <p className="font-serif text-sm sm:text-base text-butter-cream">
                  {brand.contactEmail}
                </p>
                <p className="text-[11px] sm:text-xs text-butter-cream/70 font-sans mt-0.5">
                  Proposals &amp; editorial commissions
                </p>
              </div>
            </div>

            {/* Studio Location Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-butter-cream/10 text-butter-cream flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9.5px] sm:text-[10px] font-sans uppercase tracking-widest text-butter-cream/50">
                  Studio Location
                </span>
                <p className="font-serif text-sm sm:text-base text-butter-cream">
                  {brand.locationDisplay}
                </p>
                <p className="text-[11px] sm:text-xs text-butter-cream/70 font-sans mt-0.5">
                  Available for destination events globally
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
