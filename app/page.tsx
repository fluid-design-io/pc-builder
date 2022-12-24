import { CoverSlider } from '@/IndexPage/CoverSlider';
import { Services } from '@/IndexPage/Services';
import { SpecSelector } from '@/IndexPage/SpecSelector';
import { GetQuote } from '@/IndexPage/GetQuote';
import { FAQ } from '@/IndexPage/FAQ';

export default function Page() {
  return (
    <main className='mb-12'>
      <CoverSlider />
      <SpecSelector />
      <section className='layout'>
        <Services />
      </section>
      <section className='layout'>
        <FAQ />
      </section>
      <section className='layout py-8'>
        <GetQuote />
      </section>
    </main>
  );
}
