import { Container } from '@/core/Container';
import { TestPage } from './TestPage';

export default async function Page() {
  return (
    <div className='grid h-[80vh] w-full place-items-center'>
      <Container>
        <h1>Build Coming Soon...</h1>
        <TestPage />
      </Container>
    </div>
  );
}
