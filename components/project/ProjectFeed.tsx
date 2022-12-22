async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 2500);
  });

  return ``;
}

export default async function ProjectFeed(): Promise<JSX.Element> {
  const bio = await getBio();
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-8'>
      <div className='card-primary min-h-[16rem] w-full' />
      <div className='card-primary min-h-[16rem] w-full' />
      <div className='card-primary min-h-[16rem] w-full' />
      {bio}
    </div>
  );
}
