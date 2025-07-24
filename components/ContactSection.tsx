"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";
import { ContentConfig, defaultContent } from "@/lib/content-config";

export default function ContactSection() {
  const [content, setContent] = useState<ContentConfig['contact']>(defaultContent.contact);
  const [formData, setFormData] = useState({
    fullName: '',
    contactEmail: '',
    phoneNumber: '',
    companyType: 'choose',
    organizationName: '',
    requestType: 'choose',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => setContent(data.contact))
      .catch(() => {
        setContent(defaultContent.contact);
      });
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    if (formData.companyType === 'choose') {
      newErrors.companyType = 'Please select a company type';
    }
    
    if (formData.requestType === 'choose') {
      newErrors.requestType = 'Please select a request type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({
        fullName: '',
        contactEmail: '',
        phoneNumber: '',
        companyType: 'choose',
        organizationName: '',
        requestType: 'choose',
        description: ''
      });
      setErrors({});
    } catch (error) {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-24 xl:py-20 2xl:py-24 bg-white">
      <div className="max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-6 xl:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-light text-gray-900 mb-6 text-4xl sm:text-5xl lg:text-[55.4px] lg:leading-[71.8px] tracking-tight">
            {content.title} <span className="font-bold text-[#5B4FFF]">{content.highlightedText}</span>
          </h2>
          <p className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Company Type */}
            <div>
              <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 mb-2">
                Company Type *
              </label>
              <select
                id="companyType"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.companyType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="choose">Choose company type</option>
                <option value="dealership">Auto Dealership</option>
                <option value="group">Dealer Group</option>
                <option value="vendor">Technology Vendor</option>
                <option value="other">Other</option>
              </select>
              {errors.companyType && <p className="mt-1 text-sm text-red-600">{errors.companyType}</p>}
            </div>

            {/* Organization Name */}
            <div className="md:col-span-2">
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Enter your organization name"
              />
            </div>

            {/* Request Type */}
            <div className="md:col-span-2">
              <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                Request Type *
              </label>
              <select
                id="requestType"
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                  errors.requestType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="choose">Choose request type</option>
                <option value="demo">Request Demo</option>
                <option value="pricing">Get Pricing</option>
                <option value="integration">Integration Support</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
              {errors.requestType && <p className="mt-1 text-sm text-red-600">{errors.requestType}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                placeholder="Tell us more about your needs..."
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-4 bg-[#5B4FFF] text-white font-semibold rounded-full hover:bg-[#4A3FE7] focus:outline-none focus:ring-2 focus:ring-[#5B4FFF] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-bold"
              >
                {isSubmitting ? 'Sending...' : content.buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}