import { CoverSlider } from "@/IndexPage/CoverSlider";
import { Services } from "@/IndexPage/Services";
import { SpecSelector } from "@/IndexPage/SpecSelector";
import { GetQuote } from "@/IndexPage/GetQuote";

export default function Page() {
  return (
    <main className='mb-12'>
      <CoverSlider />

      <SpecSelector />
      <section className='layout'>
        <Services />
      </section>
      <section className='layout'>
        <GetQuote />
      </section>
    </main>
  );
}
