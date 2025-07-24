'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, ChangeEvent, FormEvent } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or support system
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900 pt-14 sm:pt-16">
        <div className="max-w-xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">Support</h1>
          <p className="mb-8 text-gray-700">Need help? Fill out the form below and our team will get back to you as soon as possible.</p>
          {submitted ? (
            <div className="p-4 bg-green-100 text-green-800 rounded mb-8">Thank you! Your message has been sent.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-2 rounded-[20px] shadow-lg hover:opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
} 