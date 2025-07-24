"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";

export default function ContactSection() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
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
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
                Full Name*
              </label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className={`bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg ${
                  errors.fullName ? 'border-red-400' : ''
                }`}
              />
              {errors.fullName && (
                <p className="text-red-300 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-white mb-1">
                Contact Email*
              </label>
              <Input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className={`bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg ${
                  errors.contactEmail ? 'border-red-400' : ''
                }`}
              />
              {errors.contactEmail && (
                <p className="text-red-300 text-sm mt-1">{errors.contactEmail}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg"
              />
            </div>

            {/* Company Type */}
            <div>
              <label htmlFor="companyType" className="block text-sm font-medium text-white mb-1">
                Company Type*
              </label>
              <Select value={formData.companyType} onValueChange={(value) => handleSelectChange('companyType', value)}>
                <SelectTrigger className={`bg-white/10 border-white/20 text-white w-full h-12 rounded-lg ${
                  errors.companyType ? 'border-red-400' : ''
                }`}>
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="choose" disabled className="text-gray-400">Choose</SelectItem>
                  <SelectItem value="dealership" className="text-gray-900">Dealership</SelectItem>
                  <SelectItem value="vendor" className="text-gray-900">Vendor</SelectItem>
                  <SelectItem value="other" className="text-gray-900">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.companyType && (
                <p className="text-red-300 text-sm mt-1">{errors.companyType}</p>
              )}
            </div>

            {/* Organization Name */}
            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium text-white mb-1">
                Organization Name
              </label>
              <Input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter your organization name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full h-12 rounded-lg"
              />
            </div>

            {/* Request Type */}
            <div>
              <label htmlFor="requestType" className="block text-sm font-medium text-white mb-1">
                Request Type*
              </label>
              <Select value={formData.requestType} onValueChange={(value) => handleSelectChange('requestType', value)}>
                <SelectTrigger className={`bg-white/10 border-white/20 text-white w-full h-12 rounded-lg ${
                  errors.requestType ? 'border-red-400' : ''
                }`}>
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="choose" disabled className="text-gray-400">Choose</SelectItem>
                  <SelectItem value="website-support" className="text-gray-900">Website Support</SelectItem>
                  <SelectItem value="digital-marketing" className="text-gray-900">Digital Marketing Assistance</SelectItem>
                  <SelectItem value="video-advertising" className="text-gray-900">Video Advertising</SelectItem>
                  <SelectItem value="seo-optimization" className="text-gray-900">SEO Optimization</SelectItem>
                  <SelectItem value="code-implementation" className="text-gray-900">Code Implementation</SelectItem>
                  <SelectItem value="other" className="text-gray-900">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.requestType && (
                <p className="text-red-300 text-sm mt-1">{errors.requestType}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
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