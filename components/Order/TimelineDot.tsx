"use client";

import { motion } from "framer-motion";

const DefaultDot = ({ index }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.3 + index * 0.1,
    }}
    className='w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-600'
  />
);

export const TimelineDot = ({
  type,
  index,
}: {
  type: "default" | "active" | "done";
  index: number;
}) => {
  if (type === "default") {
    return <DefaultDot index={index} />;
  } else if (type === "active") {
    return (
      <>
        <DefaultDot index={index} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 1.1 + index * 0.1,
          }}
          className='-mt-8 w-8 h-8 flex justify-center z-[5] items-center relative ring-4 ring-gray-700 dark:ring-gray-100 rounded-full shadow-xl shadow-primary-400 dark:shadow-primary-500'
        >
          <motion.div className='absolute top-0 left-0 w-8 h-8 flex-shrink-0 rounded-full bg-primary-500 dark:bg-primary-400' />
        </motion.div>
      </>
    );
  } else {
    return (
      <>
        <DefaultDot index={index} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.9 + index * 0.1,
          }}
          className='-mt-8 w-8 h-8 flex justify-center z-[5] items-center relative'
        >
          <motion.div className='absolute top-3 left-2.5 w-3 h-3 flex-shrink-0 rounded-full bg-gray-700 dark:bg-gray-100' />
        </motion.div>
      </>
    );
  }
};
