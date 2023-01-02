import Image from 'next/image';

import backgroundImageLight from '~/assets/images/background-faqs-light.jpg';
import backgroundImageDark from '~/assets/images/background-faqs-dark.jpg';

import { Container } from '@/core/Container';
import { DynamicImage } from '@/core/DynamicImage';

const faqs = [
  [
    {
      question: 'How long will it take for for my PC to arrive?',
      answer:
        'Due to high demand from the holidays, we are expecting shipping to be delayed around 4-6 weeks. We apologize for the delay.',
    },
    {
      question: 'How do I track my order?',
      answer:
        'Once your order has been shipped, you will receive an email with a tracking number. You can use this number to track your order on our website.',
    },
  ],
  [
    {
      question: 'Cancellation Policy',
      answer:
        'We do not accept cancellations. If you wish to cancel your order, please contact our support team and we will do our best to accommodate your request.',
    },
    {
      question: 'Refund Policy',
      answer:
        "We have a 30-day refund policy. If you're not satisfied with your purchase, you can request a refund within 30 days of your order's delivery date. A 15% restock fee will be applied. Please note that we do not accept returns on custom-built PCs.",
    },
  ],
  [
    {
      question: 'Warranty Services',
      answer:
        'All orders placed with include a 2-year parts and labor limited warranty. We will repair or replace defective hardware free of charge as long as they have not been physically damaged or abused.',
    },
  ],
];

export function Faqs() {
  return (
    <section
      id='faq'
      aria-labelledby='faq-title'
      className='relative overflow-hidden bg-gray-50 py-20 dark:bg-[#131315] sm:py-32'
    >
      <DynamicImage
        className='absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4'
        src={{ light: backgroundImageLight, dark: backgroundImageDark }}
        width={1558}
        height={946}
        placeholder='blur'
      />
      <Container className='relative'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 id='faq-title'>Frequently asked questions</h2>
          <p className='mt-4 text-lg tracking-tight'>
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role='list'
          className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3'
        >
          {faqs.map((column, columnIndex) => (
            <li key={`faq-row-${columnIndex}`}>
              <ul role='list' className='flex flex-col gap-y-8'>
                {column.map((faq, faqIndex) => (
                  <li key={`faq-column-${faqIndex}`}>
                    <h3 className='text-lg leading-7 tracking-wide'>
                      {faq.question}
                    </h3>
                    <p className='mt-4 text-sm'>{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
