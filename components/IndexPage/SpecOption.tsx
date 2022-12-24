'use client';

import { GridPatterns } from '@/core/GridPatterns';
import { RadioGroup } from '@headlessui/react';
import { useMotionValue } from 'framer-motion';
import clsxm from 'lib/clsxm';

const patterns = [
  {
    y: 16,
    squares: [
      [0, 1],
      [1, 3],
    ],
  },
  {
    y: -6,
    squares: [
      [-1, 2],
      [1, 3],
    ],
  },
  {
    y: 32,
    squares: [
      [0, 2],
      [1, 4],
    ],
  },
];

export const SpecOption = ({ plan, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function onTouchMove({ currentTarget, touches }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(touches[0].clientX - left);
    mouseY.set(touches[0].clientY - top);
  }
  return (
    <RadioGroup.Option
      as='div'
      value={plan}
      className={({ checked, active }) =>
        clsxm(
          checked
            ? 'border-transparent'
            : 'border-gray-300 dark:border-gray-700',
          active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
          'group relative block cursor-pointer rounded-md border bg-white px-6 py-4 shadow-sm focus:outline-none dark:bg-white/5 sm:flex sm:justify-between'
        )
      }
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {({ active, checked }) => (
        <>
          <div className='relative z-[5] flex items-center'>
            <span className='flex flex-col text-sm'>
              <RadioGroup.Label
                as='span'
                className='pb-2 font-medium text-gray-900 dark:text-gray-100 md:pb-0'
              >
                {plan.name}
              </RadioGroup.Label>
              <RadioGroup.Description
                as='span'
                className='text-gray-500 dark:text-gray-400'
              >
                <span className='block sm:inline'>{plan.ram} RAM</span>
                <br className='hidden md:block' />
                <span className='block sm:inline'>{plan.gpu}</span>
                <br className='hidden md:block' />
                <span className='block sm:inline'>{plan.disk}</span>
              </RadioGroup.Description>
            </span>
          </div>
          <RadioGroup.Description
            as='span'
            className='relative z-[5] mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right'
          >
            <span className='font-medium text-gray-900 dark:text-gray-100'>
              {plan.price}
            </span>
          </RadioGroup.Description>
          <span
            className={clsxm(
              active ? 'border' : 'border-2',
              checked ? 'border-indigo-500' : 'border-transparent',
              'pointer-events-none absolute -inset-px z-[5] rounded-md'
            )}
            aria-hidden='true'
          />
          <GridPatterns
            {...{
              ...patterns[index % patterns.length || 0],
            }}
            mouseX={mouseX}
            mouseY={mouseY}
            checked={checked}
          />
        </>
      )}
    </RadioGroup.Option>
  );
};
