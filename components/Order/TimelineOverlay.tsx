"use client";

import clsxm from "../../lib/clsxm";
import { motion } from "framer-motion";

export const TimelineOverlay = ({ progress }) => {
  if (progress === 0) return null;
  return (
    <motion.div
      className={clsxm(
        "absolute left-0 top-0 z-[1] w-8 bg-primary-400 dark:bg-primary-500"
      )}
      initial={{ height: 0, borderRadius: 9999 }}
      animate={{
        height: `calc(${progress * 100}% + 16px)`,
        borderRadius: 9999,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.8 }}
    >
      <div />
    </motion.div>
  );
};
