import { useMotionTemplate } from "framer-motion";
import { GridPattern } from "./GridPattern";
import { motion } from "framer-motion";
import clsxm from "lib/clsxm";

export const GridPatterns = ({
  mouseX,
  mouseY,
  checked,
  ...gridProps
}: {
  mouseX: any;
  mouseY: any;
  y: number;
  checked: boolean;
  squares: number[][];
}) => {
  const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className='pointer-events-none absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0 rounded-md transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50'>
        <GridPattern
          width={120}
          height={40}
          x='50%'
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/[0.05] dark:stroke-white/[0.05]'
          {...gridProps}
        />
      </div>
      <motion.div
        className={clsxm(
          "absolute inset-0 rounded-md bg-gradient-to-r from-primary-100 to-rose-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-primary-600/20 dark:to-rose-600/30",
          checked && "group-hover:opacity-10"
        )}
        style={style}
      />
      {checked && (
        <motion.div
          initial={{
            opacity: 0,
            borderRadius: "100%",
            width: 0,
            height: 0,
            x: mouseX.get(),
            y: mouseY.get(),
          }}
          animate={{
            opacity: 1,
            width: 1000,
            height: 1000,
            x: mouseX.get() - 500,
            y: mouseY.get() - 500,
          }}
          transition={{ duration: 0.85, type: "spring", bounce: 0 }}
          className='absolute origin-center rounded-md bg-gradient-to-r from-primary-100 to-rose-100 opacity-70 mix-blend-multiply dark:from-primary-600/20 dark:to-rose-600/30 dark:opacity-90 dark:mix-blend-screen'
        />
      )}
      <motion.div
        className='absolute inset-0 rounded-md opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100 dark:mix-blend-multiply'
        style={style}
      >
        <GridPattern
          width={120}
          height={40}
          x='50%'
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/[.15] dark:stroke-white/10'
          {...gridProps}
        />
      </motion.div>
    </div>
  );
};
