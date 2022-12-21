import clsxm from "../lib/clsxm";
import { IndexCover } from "../components/IndexCover";
import { Search } from "../components/Search";

const random = () => Math.floor(Math.random() * 3) + 1;

export default function Page() {
  const index = random();
  return (
    <main className='mb-12'>
      <section
        className={clsxm(
          "index-cover w-full bg-gray-100 dark:bg-gray-700/10",
          "relative -mt-24"
        )}
      >
        <IndexCover index={index} />
        <div className='flex-1 flex flex-col justify-between items-center absolute inset-0 z-[2] layout'>
          <div className='flex items-center justify-between w-full pt-[85%] md:pt-[30%]'>
            <h1 className='text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight flex-1 text-start'>
              Find your order
            </h1>
          </div>
          <div
            className={clsxm(
              "rounded w-full -mb-6 md:-mb-8",
              "bg-white dark:bg-gray-800",
              "shadow-xl shadow-gray-200 dark:shadow-black/30",
              "ring-1 ring-gray-100 dark:ring-gray-50/10",
              "focus-within:ring-primary-500 focus-within:ring-1 dark:focus-within:ring-primary-400"
            )}
          >
            <Search />
          </div>
        </div>
      </section>
      <section className='layout mt-16 md:mt-24'>
        <h3 className='mb-4'>Latest Builds</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 lg:gap-8'>
          <div className='card w-full min-h-[16rem]' />
          <div className='card w-full min-h-[16rem]' />
          <div className='card w-full min-h-[16rem]' />
        </div>
      </section>
    </main>
  );
}
