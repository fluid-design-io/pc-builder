"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";

import gameCover1 from "~/assets/game-cover/game-cover-1.webp";
import gameCover2 from "~/assets/game-cover/game-cover-2.webp";
import gameCover3 from "~/assets/game-cover/game-cover-3.webp";
import gameCover4 from "~/assets/game-cover/game-cover-4.webp";
import gameCover5 from "~/assets/game-cover/game-cover-5.webp";
import gameCover6 from "~/assets/game-cover/game-cover-6.webp";

const PC_TIER = {
  TIER_1: "Hobby",
  TIER_2: "Casual",
  TIER_3: "Professional",
};

const SCREEN_RESOLUTION = {
  1080: "1080p",
  1440: "1440p",
  2160: "4K",
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
    ram: "16GB",
    gpu: "RTX 2060 Ti 6GB",
    disk: "160 GB SSD",
    price: "$1540",
  },
  {
    name: PC_TIER.TIER_2,
    ram: "32GB",
    gpu: "RTX 3060 12GB",
    disk: "512 GB SSD",
    price: "$2184",
  },
  {
    name: PC_TIER.TIER_3,
    ram: "64GB",
    gpu: "RTX 4090 16GB",
    disk: "1024 GB SSD",
    price: "$3440",
  },
];

const games = [
  {
    id: 1,
    name: "Battlefield 2042",
    cover: gameCover1,
    frameRate: {
      [PC_TIER.TIER_1]: 45,
      [PC_TIER.TIER_2]: 60,
      [PC_TIER.TIER_3]: 80,
    },
  },
  {
    id: 2,
    name: "Grand Theft Auto V",
    cover: gameCover2,
    frameRate: {
      [PC_TIER.TIER_1]: 40,
      [PC_TIER.TIER_2]: 65,
      [PC_TIER.TIER_3]: 90,
    },
  },
  {
    id: 3,
    name: "Cyberpunk 2077",
    cover: gameCover3,
    frameRate: {
      [PC_TIER.TIER_1]: 30,
      [PC_TIER.TIER_2]: 40,
      [PC_TIER.TIER_3]: 60,
    },
  },
  {
    id: 4,
    name: "Apex Legends",
    cover: gameCover4,
    frameRate: {
      [PC_TIER.TIER_1]: 60,
      [PC_TIER.TIER_2]: 80,
      [PC_TIER.TIER_3]: 120,
    },
  },
  {
    id: 5,
    name: "MineCraft",
    cover: gameCover5,
    frameRate: {
      [PC_TIER.TIER_1]: 60,
      [PC_TIER.TIER_2]: 80,
      [PC_TIER.TIER_3]: 120,
    },
  },
  {
    id: 6,
    name: "League of Legends",
    cover: gameCover6,
    frameRate: {
      [PC_TIER.TIER_1]: 110,
      [PC_TIER.TIER_2]: 140,
      [PC_TIER.TIER_3]: 180,
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SpecSelector = () => {
  const [selected, setSelected] = useState(plans[0]);
  const [resolution, setResolution] = useState(screenResolutions[1]);

  const calculateFrameRate = (frameRate) =>
    Math.round(frameRate * resolution.factor);

  return (
    <section className='layout grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8'>
      <div className='card-secondary card-secondary-hover flex flex-col gap-4'>
        <RadioGroup
          value={resolution}
          onChange={setResolution}
          className='mt-2'
        >
          <RadioGroup.Label className='sr-only'>
            {" "}
            Choose a memory option{" "}
          </RadioGroup.Label>
          <div className='grid grid-cols-3 gap-3'>
            {screenResolutions.map((screen) => (
              <RadioGroup.Option
                key={`screen-${screen.name}`}
                value={screen}
                className={({ active, checked }) =>
                  classNames(
                    checked
                      ? "border-transparent bg-indigo-600 text-white"
                      : "border-gray-300 dark:border-gray-700",
                    active
                      ? "border-indigo-500 bg-indigo-600 text-white ring-2 ring-indigo-500 hover:bg-indigo-700"
                      : "",
                    "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1"
                  )
                }
              >
                <RadioGroup.Label as='span'>{screen.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
          <div className='space-y-4'>
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ checked, active }) =>
                  classNames(
                    checked
                      ? "border-transparent"
                      : "border-gray-300 dark:border-gray-700",
                    active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                    "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none dark:bg-white/5 sm:flex sm:justify-between"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className='flex items-center'>
                      <span className='flex flex-col text-sm'>
                        <RadioGroup.Label
                          as='span'
                          className='font-medium text-gray-900 dark:text-gray-100'
                        >
                          {plan.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as='span'
                          className='text-gray-500 dark:text-gray-400'
                        >
                          <span className='block sm:inline'>
                            {plan.ram} RAM
                          </span>
                          <br />
                          <span className='block sm:inline'>{plan.gpu}</span>
                          <br />
                          <span className='block sm:inline'>{plan.disk}</span>
                        </RadioGroup.Description>
                      </span>
                    </span>
                    <RadioGroup.Description
                      as='span'
                      className='mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right'
                    >
                      <span className='font-medium text-gray-900 dark:text-gray-100'>
                        {plan.price}
                      </span>
                    </RadioGroup.Description>
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-500" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden='true'
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className='card-secondary card-secondary-hover grid grid-cols-2 gap-1 md:grid-cols-3'>
        {games.map((game) => (
          <div
            key={`game-${game.id}`}
            className='relative transform-gpu overflow-hidden rounded-sm'
          >
            <Image src={game.cover} alt={game.name} placeholder='blur' />
            <div className='absolute bottom-0 left-0 z-10 w-full overflow-hidden rounded-b-sm bg-black bg-opacity-50 p-2 backdrop-blur'>
              <div className='flex items-center'>
                <div>
                  <span className='font-bold text-white'>
                    {calculateFrameRate(game.frameRate[selected.name])} FPS
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
