export const GetQuote = () => {
  return (
    <div className='relative'>
      <div
        className='bg-warm-gray-50 absolute left-0 right-0 h-1/2'
        aria-hidden='true'
      />
      <div className='relative'>
        <div className='rounded-md bg-gradient-to-l from-rose-800 to-primary-700 py-10 px-6 sm:py-16 sm:px-12 lg:flex lg:items-center lg:py-20 lg:px-20'>
          <div className='lg:w-0 lg:flex-1'>
            <h2 className='text-md font-bold tracking-tight text-white'>
              Get a quote
            </h2>
            <p className='mt-4 max-w-md text-lg text-cyan-100'>
              Interested building a custom PC? Get a quote from us today!
            </p>
          </div>
          <div className='mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1'>
            <form className='sm:flex'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email-address'
                type='email'
                autoComplete='email'
                required
                className='placeholder-warm-gray-500 w-full rounded-md border-white px-5 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-700'
                placeholder='Enter your email'
              />
              <button
                type='submit'
                className='focus:ring-purple-cyan-700 mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0'
              >
                Get a quote
              </button>
            </form>
            <p className='mt-3 text-sm text-cyan-100'>
              We care about the protection of your data. Read our{" "}
              <a href='#' className='font-medium text-white underline'>
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
