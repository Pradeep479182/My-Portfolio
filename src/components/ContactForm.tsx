import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/contact.css";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg?: string }>(null);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setStatus(null);
    if (!message.trim()) {
      setStatus({ ok: false, msg: "Please enter a message." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ ok: true, msg: "Message sent. Thank you!" });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ ok: false, msg: data.error || "Failed to send message." });
      }
    } catch (err: any) {
      setStatus({ ok: false, msg: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

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

              <form onSubmit={sendMessage} className="contact-form">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button className="send-btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </button>

                {status && (
                  <div className={`send-status ${status.ok ? "ok" : "error"}`}>
                    {status.msg}
                  </div>
                )}

                <button
                  className="close-btn"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setStatus(null);
                  }}
                >
                  ✕
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;