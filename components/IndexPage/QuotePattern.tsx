'use client';

import { GridPattern } from '@/core/GridPattern';
import { useMotionValue } from 'framer-motion';

import { useMotionTemplate } from 'framer-motion';
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
  const maskImage = useMotionTemplate`radial-gradient(280px at ${mouseX}px ${mouseY}px, white, transparent)`;
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
        className={clsxm(
          'absolute inset-0 rounded-md bg-gradient-to-r from-primary-200/30 to-rose-300/50 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-primary-600/30 dark:to-rose-600/30'
        )}
        style={style}
      />
      <motion.div
        className='absolute inset-0 rounded-md opacity-0 mix-blend-multiply transition duration-300 group-hover:opacity-100'
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

export const QuotePattern = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const pattern = {
    y: -6,
    squares: [
      [0, 1],
      [1, 3],
      [-1, 2],
      [2, 1],
    ],
  };
  return (
    <div className='group absolute inset-0 z-[1]' onMouseMove={onMouseMove}>
      <GridPatterns
        mouseX={mouseX}
        mouseY={mouseY}
        squares={pattern.squares}
        y={pattern.y}
        gridHeight={80}
        gridWidth={200}
      />
    </div>
  );
};
