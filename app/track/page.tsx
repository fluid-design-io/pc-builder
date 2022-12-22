/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Suspense } from "react";
import clsxm from "../../lib/clsxm";
import { IndexCover } from "../../components/IndexPage/IndexCover";
import { Search } from "../../components/Order/Search";
import ProjectFeed from "../../components/project/ProjectFeed";

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
        <div className='layout absolute inset-0 z-[2] flex flex-1 flex-col items-center justify-between'>
          <div className='flex w-full items-center justify-between pt-[85%] md:pt-[30%]'>
            <h1 className='flex-1 text-start text-4xl font-bold tracking-tight lg:text-6xl xl:text-7xl'>
              Find your order
            </h1>
          </div>
          <div
            className={clsxm(
              "-mb-6 w-full rounded md:-mb-8",
              "bg-white dark:bg-gray-800",
              "shadow-xl shadow-gray-200 dark:shadow-black/30",
              "ring-1 ring-gray-100 dark:ring-gray-50/10",
              "focus-within:ring-1 focus-within:ring-primary-500 dark:focus-within:ring-primary-400"
            )}
          >
            <Search />
          </div>
        </div>
      </section>
      <section className='layout mt-16 md:mt-24'>
        <h3 className='mb-4'>Latest Builds</h3>
        <Suspense fallback={<p>Loading feed...</p>}>
          {/* @ts-ignore */}
          <ProjectFeed />
        </Suspense>
      </section>
    </main>
  );
}
