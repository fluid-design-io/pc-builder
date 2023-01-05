'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import Image from 'next/image';

import gameCover1 from '~/assets/game-cover/game-cover-1.webp';
import gameCover2 from '~/assets/game-cover/game-cover-2.webp';
import gameCover3 from '~/assets/game-cover/game-cover-3.webp';
import gameCover4 from '~/assets/game-cover/game-cover-4.webp';
import gameCover5 from '~/assets/game-cover/game-cover-5.webp';
import gameCover6 from '~/assets/game-cover/game-cover-6.webp';
import { SpecOption } from './SpecOption';
import clsxm from 'lib/clsxm';

import { AnimatePresence, motion } from 'framer-motion';

import backgroundImageLight from '~/assets/images/background-features-light.jpg';
import backgroundImageDark from '~/assets/images/background-features-dark.jpg';
import { Container } from '@/core/Container';
import { SpecDescription } from './SpecDescription';
import { DynamicImage } from '@/core/DynamicImage';

const PC_TIER = {
  TIER_1: 'Hobby',
  TIER_2: 'Casual',
  TIER_3: 'Professional',
};

const SCREEN_RESOLUTION = {
  1080: '1080p',
  1440: '1440p',
  2160: '4K',
};

const screenResolutions = [
  {
    id: 1,
    name: SCREEN_RESOLUTION[1080],
    factor: 1.5,
  },
  {
    id: 2,
    name: SCREEN_RESOLUTION[1440],
    factor: 1,
  },
  {
    id: 3,
    name: SCREEN_RESOLUTION[2160],
    factor: 0.75,
  },
];

const plans = [
  {
    name: PC_TIER.TIER_1,
    ram: '16GB',
    gpu: 'RTX 2060 Ti 6GB',
    disk: '256 GB SSD',
    price: '$1540',
    specs: {
      options: { graphics: 82, processor: 80, memory: 70, storage: 45 },
      description:
        'A great choice for casual gamers who want to play the latest games at 1080p. This PC should be able to run most games at 60 FPS.',
    },
  },
  {
    name: PC_TIER.TIER_2,
    ram: '32GB',
    gpu: 'RTX 3060 12GB',
    disk: '512 GB SSD',
    price: '$2184',
    specs: {
      options: {
        graphics: 90,
        processor: 90,
        memory: 80,
        storage: 75,
      },
      description:
        'For gamers who want to play the latest games at 1440p with high settings. This PC spec is designed with the latest games in mind.',
    },
  },
  {
    name: PC_TIER.TIER_3,
    ram: '64GB',
    gpu: 'RTX 4090 16GB',
    disk: '1024 GB SSD',
    price: '$3440',
    specs: {
      options: { graphics: 97, processor: 92, memory: 90, storage: 85 },
      description:
        'For professional gamers who want to play the latest games at 4K. A non-compromising PC spec for the most demanding gamers.',
    },
  },
];

export type Plan = typeof plans[0];

const games = [
  {
    id: 1,
    name: 'Battlefield 2042',
    cover: gameCover1,
    frameRate: {
      [PC_TIER.TIER_1]: 45,
      [PC_TIER.TIER_2]: 60,
      [PC_TIER.TIER_3]: 80,
    },
  },
  {
    id: 2,
    name: 'Grand Theft Auto V',
    cover: gameCover2,
    frameRate: {
      [PC_TIER.TIER_1]: 40,
      [PC_TIER.TIER_2]: 65,
      [PC_TIER.TIER_3]: 90,
    },
  },
  {
    id: 3,
    name: 'Cyberpunk 2077',
    cover: gameCover3,
    frameRate: {
      [PC_TIER.TIER_1]: 30,
      [PC_TIER.TIER_2]: 40,
      [PC_TIER.TIER_3]: 60,
    },
  },
  {
    id: 4,
    name: 'Apex Legends',
    cover: gameCover4,
    frameRate: {
      [PC_TIER.TIER_1]: 60,
      [PC_TIER.TIER_2]: 80,
      [PC_TIER.TIER_3]: 120,
    },
  },
  {
    id: 5,
    name: 'MineCraft',
    cover: gameCover5,
    frameRate: {
      [PC_TIER.TIER_1]: 60,
      [PC_TIER.TIER_2]: 80,
      [PC_TIER.TIER_3]: 120,
    },
  },
  {
    id: 6,
    name: 'League of Legends',
    cover: gameCover6,
    frameRate: {
      [PC_TIER.TIER_1]: 110,
      [PC_TIER.TIER_2]: 140,
      [PC_TIER.TIER_3]: 180,
    },
  },
];
export const SpecSelector = () => {
  const [selected, setSelected] = useState(plans[0]);
  const [resolution, setResolution] = useState(screenResolutions[1]);

  const calculateFrameRate = (frameRate) =>
    Math.round(frameRate * resolution.factor);

  return (
    <section
      className='relative overflow-hidden bg-[#5759F0] pt-20 pb-28 dark:bg-[#1C0E55] sm:py-32'
      id='features'
      aria-label='Features for building PC'
    >
      <DynamicImage
        className='absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]'
        src={{ light: backgroundImageLight, dark: backgroundImageDark }}
        width={2245}
        height={1636}
        placeholder='blur'
      />
      <Container className='relative mx-auto max-w-md sm:max-w-2xl md:max-w-5xl 2xl:max-w-[96rem]'>
        <h1 className='mb-12 text-center text-white lg:mb-16'>
          Which is right for you?
        </h1>
        <div className='flex flex-col gap-4 sm:flex-row md:gap-6 lg:gap-8'>
          <div className='card-secondary card-secondary-hover flex flex-grow flex-col gap-4'>
            <div className='flex w-full flex-col gap-4 md:gap-6 lg:gap-8 2xl:flex-row'>
              <div className='flex flex-grow flex-col gap-4'>
                <RadioGroup
                  value={resolution}
                  onChange={setResolution}
                  className='mt-2'
                >
                  <RadioGroup.Label className='sr-only'>
                    Choose a screen resolution
                  </RadioGroup.Label>
                  <div className='grid grid-cols-3 gap-3'>
                    {screenResolutions.map((screen) => (
                      <RadioGroup.Option
                        key={`screen-${screen.name}`}
                        value={screen}
                        className={({ active, checked }) =>
                          clsxm(
                            checked
                              ? 'border-transparent bg-primary-600 text-white'
                              : 'border-gray-300 dark:border-gray-700',
                            active
                              ? 'border-primary-500 bg-primary-600 text-white ring-2 ring-primary-500 hover:bg-primary-700'
                              : '',
                            'flex cursor-pointer select-none items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                          )
                        }
                      >
                        {({ checked }) => (
                          <RadioGroup.Label
                            as='div'
                            className='relative flex flex-1 flex-col items-stretch justify-center text-center'
                          >
                            <AnimatePresence>
                              <motion.div
                                key={`screen-resolution-name-${screen.name}`}
                                layoutId={`screen-resolution-name-${screen.name}`}
                              >
                                <span>{screen.name}</span>
                              </motion.div>
                              {checked && (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  key={`screen-resolution-${screen.name}`}
                                  layoutId={`screen-resolution-${screen.name}`}
                                  className='-mt-1 text-[0.6rem] uppercase'
                                >
                                  Resolution
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </RadioGroup.Label>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <RadioGroup value={selected} onChange={setSelected}>
                  <RadioGroup.Label className='sr-only'>
                    Computer Specs
                  </RadioGroup.Label>
                  <div className='space-y-4'>
                    {plans.map((plan, index) => (
                      <SpecOption
                        key={`plan-${plan.name}`}
                        plan={plan}
                        index={index}
                      />
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className='min-w-0 flex-shrink-0'>
                <SpecDescription name={selected.name} specs={selected.specs} />
              </div>
            </div>
          </div>
          <div className='card-secondary card-secondary-hover grid min-w-[20%] flex-shrink-0 grid-cols-12 place-items-center gap-1 @container md:min-w-[40%] xl:min-w-[50%] 2xl:min-w-[40%]'>
            {games.map((game, i) => (
              <div
                key={`game-${game.id}`}
                className='relative col-span-12 aspect-[0.8/1] transform-gpu overflow-hidden rounded-sm @[10rem]:col-span-6 @md:col-span-4'
              >
                <Image src={game.cover} alt={game.name} placeholder='blur' />
                <div className='absolute bottom-0 left-0 z-10 w-full overflow-hidden rounded-b-sm bg-black bg-opacity-50 p-2 backdrop-blur'>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      <AnimatePresence mode='popLayout'>
                        <motion.div
                          initial={{ opacity: 0, y: 12, scaleY: 0.8 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -12, scaleY: 0.8 }}
                          transition={{
                            duration: 1,
                            delay: i * 0.08,
                            type: 'spring',
                            bounce: 0,
                          }}
                          key={`fps-${game.id}-${
                            game.frameRate[selected.name]
                          }-${selected.name}`}
                          className='relative font-bold text-white'
                        >
                          {calculateFrameRate(game.frameRate[selected.name])}
                        </motion.div>
                      </AnimatePresence>
                      <motion.span
                        layoutId={`span-${game.id}-${
                          game.frameRate[selected.name]
                        }-${selected.name}`}
                        transition={{
                          delay: i * 0.08,
                        }}
                        style={{
                          paddingLeft: 4,
                        }}
                        className='text-white'
                      >
                        FPS
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
