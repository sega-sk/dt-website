"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({ firstName: '', lastName: '', email: '', phone: '', comments: '' });
    } catch (error) {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative py-12 sm:py-20 lg:py-24 xl:py-20 2xl:py-24 bg-[#742fff] overflow-hidden">
      {/* Subtle glow bottom right */}
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none filter blur-2xl">
        <div className="w-full h-full rounded-full bg-white opacity-30" />
      </div>
      <div className="max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-6 xl:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="font-poppins font-light text-white mb-2 text-4xl sm:text-5xl lg:text-[55.4px] lg:leading-[71.8px] tracking-tight max-w-xl mx-auto lg:mx-0">
              Experience <span className="font-black">the<br className='hidden md:inline'/> Platform</span>
            </h2>
            <p className="font-poppins mt-2 text-base sm:text-lg text-white max-w-xl mx-auto lg:mx-0">
              Experience the Platform
            </p>
          </div>

          {/* Right Content - Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">First Name*</label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">Last Name*</label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email*</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Phone*</label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-white mb-1">Comments</label>
              <Textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Tell us about your project or ask any questions..."
                rows={4}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full resize-none rounded-lg"
              />
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="font-poppins text-[15px] font-medium bg-white text-gray-900 hover:bg-gray-200 transition-all px-6 py-2 rounded-[20px] shadow-lg w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  'Contact Us'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}