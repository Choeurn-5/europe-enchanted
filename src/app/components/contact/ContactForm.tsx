'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function ContactForm({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const eyebrow = data?.eyebrow || 'Direct Message';
  const heading = data?.heading || 'Send Us an Inquiry';
  const description = data?.description || 'Fill in the details below and our reservations team will reply within 24 hours.';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    dates: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate sending message or forwarding to inquiry endpoint
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      dates: '',
      message: '',
    });
    setStatus('idle');
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
      className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-xl shadow-[#0C3B73]/5 relative overflow-hidden"
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0C3B73] via-[#00A3C4] to-[#7dd8ed]" />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3C4]/10 text-[#00A3C4] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0C3B73]">
          {heading}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {description}
        </p>
      </div>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 sm:py-14 space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-[#00A3C4]/10 text-[#00A3C4] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#0C3B73]">
            Message Received!
          </h3>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-[#0C3B73]">{formData.name}</span>. We have received your inquiry regarding <span className="font-medium text-[#00A3C4]">{formData.subject}</span> and will get back to you shortly.
          </p>
          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full border border-[#0C3B73]/30 text-[#0C3B73] hover:bg-[#0C3B73] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-[#0C3B73] uppercase tracking-wider mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Somnang Chan"
                className="w-full h-12 px-4 rounded-xl bg-[#F9FAFB] border border-gray-200 text-sm text-[#0C3B73] placeholder-gray-400 focus:outline-none focus:border-[#00A3C4] focus:ring-2 focus:ring-[#00A3C4]/20 focus:bg-white transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#0C3B73] uppercase tracking-wider mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. somnang@example.com"
                className="w-full h-12 px-4 rounded-xl bg-[#F9FAFB] border border-gray-200 text-sm text-[#0C3B73] placeholder-gray-400 focus:outline-none focus:border-[#00A3C4] focus:ring-2 focus:ring-[#00A3C4]/20 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone / WhatsApp */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-[#0C3B73] uppercase tracking-wider mb-2">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +855 12 345 678"
                className="w-full h-12 px-4 rounded-xl bg-[#F9FAFB] border border-gray-200 text-sm text-[#0C3B73] placeholder-gray-400 focus:outline-none focus:border-[#00A3C4] focus:ring-2 focus:ring-[#00A3C4]/20 focus:bg-white transition-all"
              />
            </div>

            {/* Inquiry Subject */}
            <div>
              <label htmlFor="subject" className="block text-xs font-semibold text-[#0C3B73] uppercase tracking-wider mb-2">
                Topic / Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-[#F9FAFB] border border-gray-200 text-sm text-[#0C3B73] focus:outline-none focus:border-[#00A3C4] focus:ring-2 focus:ring-[#00A3C4]/20 focus:bg-white transition-all"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Bungalow Reservation">Bungalow Reservation</option>
                <option value="Boat Transfer & Arrival">Speedboat Transfer &amp; Arrival</option>
                <option value="Special Events & Weddings">Special Events &amp; Group Retreats</option>
                <option value="Island Tours & Activities">Island Tours &amp; Activities</option>
              </select>
            </div>
          </div>

          {/* Intended Travel Dates */}
          <div>
            <label htmlFor="dates" className="block text-xs font-semibold text-[#0C3B73] uppercase tracking-wider mb-2">
              Approximate Travel Dates (Optional)
            </label>
            <input
              type="text"
              id="dates"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              placeholder="e.g. Nov 15 – Nov 20, 2 guests"
              className="w-full h-12 px-4 rounded-xl bg-[#F9FAFB] border border-gray-200 text-sm text-[#0C3B73] placeholder-gray-400 focus:outline-none focus:border-[#00A3C4] focus:ring-2 focus:ring-[#00A3C4]/20 focus:bg-white transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-[#0C3B73] uppercase tracking-wider mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us how we can help make your island stay unforgettable..."
              className="w-full p-4 rounded-xl bg-[#F9FAFB] border border-gray-200 text-sm text-[#0C3B73] placeholder-gray-400 focus:outline-none focus:border-[#00A3C4] focus:ring-2 focus:ring-[#00A3C4]/20 focus:bg-white transition-all resize-y"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#00A3C4] via-[#0e529a] to-[#0C3B73] hover:opacity-95 text-white font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#00A3C4]/20 hover:shadow-[#00A3C4]/35 transition-all duration-300 disabled:opacity-70 cursor-pointer"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            We respect your privacy. Your information is never shared with third parties.
          </p>
        </form>
      )}
    </motion.div>
  );
}
