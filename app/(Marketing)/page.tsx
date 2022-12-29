import { CallToAction } from '@/IndexPage/CallToAction';
import { CoverSlider } from '@/IndexPage/CoverSlider';
import { Faqs } from '@/IndexPage/Faqs';
import { GetQuote } from '@/IndexPage/GetQuote';
import { SpecSelector } from '@/IndexPage/SpecSelector';
import { Testimonials } from '@/IndexPage/Testimonials';

export default function Page() {
  return (
    <main className='mb-12'>
      <CoverSlider />
      <SpecSelector />
      <Testimonials />
      <CallToAction />
      <Faqs />
      <section className='layout py-8'>
        <GetQuote />
      </section>
    </main>
  );
}
