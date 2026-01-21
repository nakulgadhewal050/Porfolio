import React, { useState } from 'react';
import ParticalsBackground from '../components/ParticalsBackground';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import Astra from '../assets/Portfoliowebsite/Astra.png';

const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isFocused, setIsFocused] = useState({});

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'budget' && value && !/^\d+$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // form validation
  const validateForm = () => {
    const required = ['name', 'email', 'service', 'message'];
    let newErrors = {};

    required.forEach((field) => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (
      formData.service &&
      formData.service !== 'other' &&
      !formData.budget.trim()
    ) {
      newErrors.budget = 'Budget is required for this service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('sending');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget || 'Not specified',
          message: formData.message,
          from_name: formData.name,
          reply_to: formData.email,
        },
        publicKey
      );

      setStatus('success');

      setFormData({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: '',
      });

      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20"
    >
      <ParticalsBackground />

      {/* Section Title */}
      <motion.div
        className="relative z-10 text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-gray-400 text-lg">Have a project in mind? Let's discuss how I can help bring it to life.</p>
      </motion.div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-[420px] rounded-2xl shadow-2xl object-cover"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Right form */}
        <motion.div
          className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">Let's Work Together</h2>
          <p className="text-gray-400 mb-8">Fill out the form below and I'll get back to you soon!</p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block mb-2 font-medium">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setIsFocused({ ...isFocused, name: true })}
                onBlur={() => setIsFocused({ ...isFocused, name: false })}
                className={`w-full p-3 rounded-lg bg-white/10 border-2 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                  errors.name
                    ? 'border-red-500'
                    : isFocused.name
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block mb-2 font-medium">
                Your Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                className={`w-full p-3 rounded-lg bg-white/10 border-2 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                  errors.email
                    ? 'border-red-500'
                    : isFocused.email
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Service */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block mb-2 font-medium">
                Service Needed <span className="text-red-400">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                onFocus={() => setIsFocused({ ...isFocused, service: true })}
                onBlur={() => setIsFocused({ ...isFocused, service: false })}
                className={`w-full p-3 rounded-lg bg-white/10 border-2 text-white focus:outline-none transition-all duration-300 cursor-pointer ${
                  errors.service
                    ? 'border-red-500'
                    : isFocused.service
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <option value="" disabled className="bg-gray-800">
                  Select a service
                </option>
                <option value="Web Development" className="bg-gray-800">
                  Web Development
                </option>
                <option value="Frontend Development" className="bg-gray-800">
                  Frontend Development
                </option>
                <option value="Backend Development" className="bg-gray-800">
                  Backend Development
                </option>
                <option value="Full Stack Development" className="bg-gray-800">
                  Full Stack Development
                </option>
                <option value="UI/UX Design" className="bg-gray-800">
                  UI/UX Design
                </option>
                <option value="other" className="bg-gray-800">
                  Others
                </option>
              </select>
              {errors.service && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.service}
                </motion.p>
              )}
            </motion.div>

            {/* Budget */}
            {formData.service && formData.service !== 'other' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block mb-2 font-medium">
                  Budget (USD) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g., 5000"
                  value={formData.budget}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, budget: true })}
                  onBlur={() => setIsFocused({ ...isFocused, budget: false })}
                  className={`w-full p-3 rounded-lg bg-white/10 border-2 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    errors.budget
                      ? 'border-red-500'
                      : isFocused.budget
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                />
                {errors.budget && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠</span> {errors.budget}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block mb-2 font-medium">
                Your Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setIsFocused({ ...isFocused, message: true })}
                onBlur={() => setIsFocused({ ...isFocused, message: false })}
                className={`w-full p-3 rounded-lg bg-white/10 border-2 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                  errors.message
                    ? 'border-red-500'
                    : isFocused.message
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                rows={5}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.message}
                </motion.p>
              )}
            </motion.div>

            {/* Status */}
            {status && (
              <p
                className={`text-sm ${status === 'success'
                    ? 'text-green-500'
                    : status === 'error'
                      ? 'text-red-500'
                      : 'text-yellow-400'
                  }`}
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'success'
                    ? 'Message sent successfully ✅'
                    : 'Failed to send message ❌'}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
