import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/contact.css";

const Contact = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mail Floating Icon */}
      <button className="mail-btn" onClick={() => setOpen(true)}>
        ✉
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="contact-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="contact-box"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85 }}
            >
              <h3>Send Message</h3>

              <input type="text" placeholder="Your Name" />
              <textarea placeholder="Your Message"></textarea>

              <button className="send-btn">Send</button>

              <button className="close-btn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;