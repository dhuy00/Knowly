import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  disableBackdropClose?: boolean;
  style?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  footer,
  children,
  disableBackdropClose = false,
  style = ''
}) => {
  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={() => !disableBackdropClose && onClose()}
          />

          {/* Dialog Box */}
          <motion.div
            className={`relative rounded-2xl shadow-xl px-6 py-2 ${style} z-10`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 cursor-pointer" aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="text-gray-700 mb-4 h-[90%]">{children}</div>

            {/* Footer */}
            {footer && <div className="flex justify-end gap-2 mt-4">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Dialog;
