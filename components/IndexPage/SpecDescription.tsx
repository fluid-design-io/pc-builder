import { Plan } from './SpecSelector';
import { AnimatePresence, motion } from 'framer-motion';
import clsxm from 'lib/clsxm';

import graphics from '~/assets/svg/graphics.svg';
import processor from '~/assets/svg/processor.svg';
import storage from '~/assets/svg/storage.svg';
import memory from '~/assets/svg/memory.svg';
import Image from 'next/image';
import { Button } from '@/buttons/AppButton';

const progressColors = [
  'bg-primary-500 dark:bg-primary-400',
  'bg-blue-500 dark:bg-blue-400',
  'bg-rose-500 dark:bg-rose-400',
  'bg-cyan-500 dark:bg-cyan-400',
];

const iconColors = [
  'bg-primary-700',
  'bg-blue-700',
  'bg-rose-700',
  'bg-cyan-700',
];

const SpecProgressBar = ({
  option,
  specs,
  index,
}: {
  option: keyof Plan['specs']['options'];
  specs: Plan['specs'];
  index: number;
}) => {
  return (
    <li className='flex flex-grow items-center'>
      <div
        className={clsxm(
          'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
          iconColors[index]
        )}
      >
        {index === 0 && (
          <Image width={24} height={24} src={graphics} alt={option} />
        )}
        {index === 1 && (
          <Image width={24} height={24} src={processor} alt={option} />
        )}
        {index === 2 && (
          <Image width={24} height={24} src={storage} alt={option} />
        )}
        {index === 3 && (
          <Image width={24} height={24} src={memory} alt={option} />
        )}
      </div>
      <div className='ml-4 w-full'>
        <p className='font-primary font-semibold uppercase tracking-wider'>
          {option}
        </p>
        <div className='mt-1 flex items-center'>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${specs.options[option]}%` }}
            transition={{ duration: 0.85, type: 'spring', bounce: 0.1 }}
            className={clsxm('h-2 rounded-full', progressColors[index])}
          />
        </div>
      </div>
    </li>
  );
};

export const SpecDescription = ({
  name,
  specs,
}: {
  name: string;
  specs: Plan['specs'];
}) => {
  return (
    <div className='flex h-full flex-col justify-around gap-4 lg:max-w-sm lg:gap-6 lg:pr-2'>
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={`selected-section-${name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h3 className='text-gradient-primary mb-2 pt-2 text-3xl uppercase lg:text-4xl'>
            {name}
          </h3>
          <p className='min-h-[5rem]'>{specs.description}</p>
        </motion.div>
      </AnimatePresence>
      <ul className='flex flex-shrink-0 flex-col gap-4'>
        {Object.entries(specs.options).map(([optionName], i) => (
          <SpecProgressBar
            key={`selected-section-option-${optionName}`}
            option={optionName as keyof Plan['specs']['options']}
            specs={specs}
            index={i}
          />
        ))}
      </ul>
      <Button
        color='slate'
        className='uppercase'
        href={`/build/?build=${name.toLowerCase()}`}
      >
        View Build
      </Button>
    </div>
  );
};
