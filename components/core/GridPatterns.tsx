import { useMotionTemplate } from 'framer-motion';
import { GridPattern } from './GridPattern';
import { motion } from 'framer-motion';
import clsxm from 'lib/clsxm';

export const GridPatterns = ({
  mouseX,
  mouseY,
  className = '',
  gridWidth = 120,
  gridHeight = 40,
  ...gridProps
}: {
  mouseX: any;
  mouseY: any;
  y: number;
  squares: number[][];
  gridWidth?: number;
  gridHeight?: number;
  className?: string;
}) => {
  const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      className={clsxm(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <div className='absolute inset-0 rounded-md transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50'>
        <GridPattern
          width={gridWidth}
          height={gridHeight}
          x='50%'
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/[0.05] dark:stroke-white/[0.05]'
          {...gridProps}
        />
      </div>
      <motion.div
        className='absolute inset-0 rounded-md bg-gradient-to-r from-primary-100 to-rose-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-primary-600/30 dark:to-rose-600/30'
        style={style}
      />
      <motion.div
        className='absolute inset-0 rounded-md opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100 dark:mix-blend-multiply'
        style={style}
      >
        <GridPattern
          width={gridWidth}
          height={gridHeight}
          x='50%'
          className='absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/[.15] dark:stroke-white/10'
          {...gridProps}
        />
      </motion.div>
    </div>
  );
};
