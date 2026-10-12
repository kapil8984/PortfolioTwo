import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sendContactMessage, ContactFormData } from '../services/contactClient';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await sendContactMessage(formData);
      setSubmitSuccess(
        response.message || 'Your message has been sent successfully to swatibaretha6@gmail.com!'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setSubmitError(
        err.message || 'Failed to send message. Please try again or reach out via direct email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const directMailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-primary/10 text-brand-primary dark:text-[#35D0BA] mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-textHeading dark:text-white tracking-tight mb-4">
            Let's Build Something Exceptional
          </h2>
          <p className="text-base sm:text-lg text-light-textMuted dark:text-dark-textMuted">
            Open to .NET Full Stack development opportunities, cross-platform mobile engineering, and API integrations.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-light-textHeading dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-primary dark:text-[#35D0BA]" />
                <span>Contact Details</span>
              </h3>
              <p className="text-sm text-light-textMuted dark:text-dark-textMuted leading-relaxed">
                Feel free to send a message via the form or contact directly through email or phone.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-[#35D0BA] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Email Address</span>
                    <span className="text-sm font-semibold text-light-textHeading dark:text-white truncate block group-hover:text-brand-primary dark:group-hover:text-[#35D0BA] transition-colors">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#35D0BA]/10 flex items-center justify-center text-[#35D0BA] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Direct Phone</span>
                    <span className="text-sm font-semibold text-light-textHeading dark:text-white group-hover:text-brand-primary dark:group-hover:text-[#35D0BA] transition-colors">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-black/5 dark:bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-[#35D0BA] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-light-textMuted dark:text-dark-textMuted">Location</span>
                    <span className="text-sm font-semibold text-light-textHeading dark:text-white">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Guarantee Notice */}
              <div className="p-3.5 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-xs text-light-textMuted dark:text-dark-textMuted">
                <span className="font-semibold text-light-textHeading dark:text-white block mb-0.5">
                  Server-Side Dispatch
                </span>
                Messages are routed through serverless email dispatch directly to {PERSONAL_INFO.email}.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-light-textHeading dark:text-white">
                Send a Direct Message
              </h3>

              {/* Feedback Banners */}
              {submitSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message Dispatched!</p>
                    <p className="text-xs mt-0.5">{submitSuccess}</p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Delivery Note</p>
                      <p className="text-xs mt-0.5 leading-relaxed">{submitError}</p>
                    </div>
                  </div>
                  <a
                    href={directMailtoUrl}
                    className="shrink-0 px-3 py-1 rounded-lg text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-300 flex items-center gap-1"
                  >
                    <span>Use Mail Client</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-light-textHeading dark:text-white">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border text-sm text-light-textHeading dark:text-white placeholder-light-textMuted/60 dark:placeholder-dark-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                        errors.name ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-light-textHeading dark:text-white">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border text-sm text-light-textHeading dark:text-white placeholder-light-textMuted/60 dark:placeholder-dark-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                        errors.email ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-light-textHeading dark:text-white">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. .NET Full Stack Developer Opportunity"
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border text-sm text-light-textHeading dark:text-white placeholder-light-textMuted/60 dark:placeholder-dark-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                      errors.subject ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                    }`}
                  />
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-light-textHeading dark:text-white">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your project, team, or inquiry..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border text-sm text-light-textHeading dark:text-white placeholder-light-textMuted/60 dark:placeholder-dark-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary resize-y ${
                      errors.message ? 'border-red-500' : 'border-light-border dark:border-dark-border'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider bg-brand-primary text-white hover:bg-brand-primaryHover shadow-glow-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <a
                    href={directMailtoUrl}
                    className="text-xs text-light-textMuted dark:text-dark-textMuted hover:text-brand-primary dark:hover:text-[#35D0BA] flex items-center gap-1 transition-colors"
                  >
                    <span>Prefer your email app? Open mailto</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
