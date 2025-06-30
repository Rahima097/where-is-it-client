import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="bg-base-200 py-16 px-4 text-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 2 } }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        >
          Subscribe to Our{' '}
          <motion.span
            animate={{
              color: ['#fe6035', '#0a1a3d', '#8b5cf6', '#091057'],
              transition: { duration: 2, repeat: Infinity },
            }}
          >
            Newsletter
          </motion.span>
        </motion.h2>

        <p className="text-black max-w-xl mx-auto mb-8 text-sm md:text-base">
          Stay updated with the latest lost and found items on WhereIsIt. Be the first to know when new listings go live.
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address..."
            className="input input-bordered input-white w-full sm:flex-1 bg-base-100 text-black"
          />
          <button className="btn btn-primary flex items-center gap-2">
            <Send className="w-4 h-4" />
            Subscribe
          </button>
        </div>

        <p className="text-black text-xs mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
