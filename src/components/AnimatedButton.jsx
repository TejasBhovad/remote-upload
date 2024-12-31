import React from "react";
import { motion } from "motion/react";
const AnimatedButton = ({ children, onClick, className }) => {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-full p-1 text-white ${className}`}
      //   className="relative overflow-hidden rounded-full p-1 text-white"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      initial="initial"
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-foreground/15"
        variants={{
          initial: {
            scale: 0.5,
            opacity: 0,
          },
          hover: {
            scale: 1,
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
      />

      {/* Content wrapper */}
      <motion.div
        className="relative z-10"
        variants={{
          initial: {
            scale: 1,
          },
          hover: {
            scale: 1.1,
          },
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

export default AnimatedButton;
