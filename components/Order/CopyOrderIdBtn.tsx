"use client";

import { ClipboardIcon } from "@heroicons/react/24/outline";
import clsxm from "../../lib/clsxm";

export const CopyOrderIdBtn = ({ id }) => {
  return (
    <button
      className={clsxm(
        "uppercase font-light transition tracking-wider text-gray-600 dark:text-gray-400 outline-none px-2 py-1 rounded-md text-sm -mx-2",
        "hover:text-gray-800 dark:hover:text-gray-200 hover:ring-1 hover:ring-gray-600 dark:hover:ring-gray-400",
        "hover:bg-gray-500/30 dark:hover:bg-gray-200/20",
        "active:text-gray-900 dark:active:text-gray-100 active:ring-1 active:ring-gray-600 dark:active:ring-gray-400",
        "flex justify-center items-center gap-2"
      )}
      onClick={() => navigator.clipboard.writeText(id)}
    >
      {id}
      <ClipboardIcon className='w-4 h-4 -mt-0.5' />
    </button>
  );
};
