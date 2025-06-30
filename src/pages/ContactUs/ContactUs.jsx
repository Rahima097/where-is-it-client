import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="px-4 md:px-10 py-20 bg-base-200">
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 1.5 } }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
      >
        Get In{" "}
        <motion.span
          animate={{
            color: ["#fe6035", "#0a1a3d", "#8b5cf6", "#091057"],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          Touch
        </motion.span>
      </motion.h2>

      <p className="text-center max-w-2xl mx-auto text-gray-600 mt-4 mb-12 text-sm md:text-base">
        We'd love to hear from you. Whether you have a question about features,
        feedback, or anything else — our team is ready to answer.
      </p>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start bg-white p-8 rounded-md shadow-md">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-secondary mb-4">
                Reach us directly via email, phone, or follow us on social media.
              </p>
              <ul className="space-y-3 text-black text-sm">
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary" />
                  support@whereisit.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary" />
                  +880191336446
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary" />
                  Online platform in Bangladesh
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold text-primary mb-2">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/maanvia.khan/"
                  target="_blank"
                  className="text-secondary hover:text-primary"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="text-secondary hover:text-primary"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/rahima-khatun28/"
                  target="_blank"
                  className="text-secondary hover:text-primary"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="John Doe"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="Write your message here..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
