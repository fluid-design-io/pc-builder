"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/order/${search}`);
      }}
    >
      <div className='relative flex items-stretch gap-4 p-1 pl-4'>
        <MagnifyingGlassIcon className='h-4 w-4 flex-shrink-0 self-center text-gray-400 sm:h-6 sm:w-6 md:h-8 md:w-8' />
        <input
          type='text'
          placeholder='Your order number'
          className='w-full border-none bg-transparent py-2.5 pl-0 font-normal tracking-tight text-gray-900 outline-none focus:outline-none focus:ring-0 dark:text-gray-50 sm:p-4 sm:text-lg lg:text-xl xl:text-2xl'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type='submit'
          className='primary-btn flex flex-1 items-center justify-center px-6 font-semibold md:px-8'
          disabled={search.length === 0}
        >
          Track
        </button>
      </div>
    </form>
  );
};
