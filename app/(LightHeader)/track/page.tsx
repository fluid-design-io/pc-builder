/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Search } from 'components/Order/Search';

import { Container } from '@/core/Container';

export default function Page() {
  return (
    <Container className='relative z-10 mt-32 px-4 pb-6 sm:px-6 md:mt-28 lg:px-8 lg:pb-16'>
      <div className='card-primary'>
        <Search />
      </div>
    </Container>
  );
}
