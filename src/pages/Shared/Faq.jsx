import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import faqAnimation from "../../assets/AnimationImg/faq.json";

const Faq = () => {
  return (
    <section className="max-w-7xl bg-transparent mx-auto py-20 px-4 md:px-10 space-y-12">
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 2 } }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
      >
        Frequently Asked{" "}
        <motion.span
          animate={{
            color: ["#fe6035", "#0a1a3d", "#8b5cf6", "#091057"],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          Questions
        </motion.span>
      </motion.h2>

      <p className="text-center max-w-2xl mx-auto text-gray-700 text-sm md:text-base">
        Common questions and answers about using WhereIsItHub — your trusted lost and found platform.
      </p>

      <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        
        {/* Lottie Animation */}
        <div className="w-full">
          <Lottie animationData={faqAnimation} loop={true} />
        </div>

        {/* Accordion FAQ */}
        <div className="space-y-4 w-full">
          <div className="collapse collapse-arrow bg-base-200 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              How do I report a lost item?
            </div>
            <div className="collapse-content">
              <p>
                Click on "Add Item", fill the form with correct details, and submit. Your listing will go live immediately.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Is there any fee to post or recover an item?
            </div>
            <div className="collapse-content">
              <p>No, WhereIsItHub is completely free to use for both posting and recovering items.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              How can I prove an item belongs to me?
            </div>
            <div className="collapse-content">
              <p>Provide specific descriptions, receipts, or photos to verify ownership before recovery. please contact with the post owner via contact info.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Can I update or delete my post?
            </div>
            <div className="collapse-content">
              <p>Yes! Visit "My Items" to update or delete your listings anytime.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              What happens when I mark something as recovered?
            </div>
            <div className="collapse-content">
              <p>The item is moved to "Recovered Items" and removed from public listings.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
