export const OrderItem = ({ item }) => {
  return (
    <li className='flex space-x-6 py-6'>
      <div className='h-14 w-14 flex-none rounded-md bg-gray-100 object-cover object-center dark:bg-gray-700 md:h-24 md:w-24' />
      <div className='flex flex-1 flex-col gap-2'>
        <div className='flex items-center justify-between gap-4'>
          <h3 className='flex flex-1 items-center gap-4 text-base font-medium'>
            {item.name}
          </h3>
          <div className='flex flex-shrink-0 items-center gap-4'>
            <p className='text-end font-semibold'>${item.price / 100}</p>
          </div>
        </div>
        {item.description && (
          <p className='whitespace-pre-line text-sm'>{item.description}</p>
        )}
      </div>
    </li>
  );
};
