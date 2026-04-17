"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    const t2 = setTimeout(() => setTooltipOpen(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Tooltip */}
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl px-4 py-3 shadow-xl text-sm font-body font-medium"
                style={{
                  background: "#123531",
                  color: "#F3E6C2",
                  border: "1px solid rgba(203, 178, 122, 0.2)",
                  maxWidth: "200px",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                }}
              >
                Fale conosco agora! 😊
                <button
                  onClick={() => setTooltipOpen(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold-light/20 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-gold" />
                </button>
                {/* Arrow */}
                <div
                  className="absolute bottom-[-6px] right-6 w-3 h-3 rotate-45"
                  style={{ background: "#123531", borderRight: "1px solid rgba(203, 178, 122, 0.2)", borderBottom: "1px solid rgba(203, 178, 122, 0.2)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            id="whatsapp-float"
            href="https://elysiumodontologia.com.br/contato"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #8E6F3A 0%, #CBB27A 100%)",
              boxShadow: "0 8px 32px rgba(142, 111, 58, 0.5)",
            }}
            aria-label="Fale conosco pelo WhatsApp"
          >
            <MessageCircle className="w-7 h-7 text-white" />

            {/* Pulse ring */}
            <span
              className="absolute w-16 h-16 rounded-full animate-ping"
              style={{
                background: "rgba(203, 178, 122, 0.3)",
                animationDuration: "2s",
              }}
            />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
