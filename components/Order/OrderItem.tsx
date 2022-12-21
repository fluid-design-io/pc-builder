export const OrderItem = ({ item }) => {
  return (
    <li className='flex space-x-6 py-6'>
      <div className='h-24 w-24 flex-none rounded-md bg-gray-100 dark:bg-gray-700 object-cover object-center' />
      <div className='flex flex-col gap-2 flex-1'>
        <div className='flex justify-between items-center gap-4'>
          <h3 className='flex items-center gap-4 text-base flex-1 font-medium'>
            {item.name}
          </h3>
          <div className='flex items-center gap-4 flex-shrink-0'>
            <p className='font-semibold text-end'>${item.price / 100}</p>
          </div>
        </div>
        {item.description && (
          <p className='text-sm whitespace-pre'>{item.description}</p>
        )}
      </div>
    </li>
  );
};
