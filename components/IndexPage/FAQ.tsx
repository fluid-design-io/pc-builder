import UnderlineLink from '@/links/UnderlineLink';

const faqs = [
  {
    id: 1,
    question: 'How long will it take for for my PC to arrive?',
    answer:
      'Due to high demand from the holidays, we are expecting shipping to be delayed around 4-6 weeks. We apologize for the delay.',
  },
  {
    id: 2,
    question: 'Warranty Services',
    answer:
      'All orders placed with include a 2-year parts and labor limited warranty. We will repair or replace defective hardware free of charge as long as they have not been physically damaged or abused.',
  },
];

export const FAQ = () => {
  return (
    <div className='card-secondary rounded-md'>
      <div className='py-8 px-2 md:px-8 lg:px-10'>
        <div className='lg:mx-auto lg:max-w-2xl lg:text-center'>
          <h2>Frequently asked questions</h2>
          <p className='mt-4'>
            Here are some of our FAQs. If you have any other questions you'd
            like answered please feel free to email us.
          </p>
        </div>
        <div className='mt-8 md:mt-12 lg:mt-14'>
          <dl className='space-y-10 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:space-y-0'>
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className='font-semibold text-gray-800  dark:text-gray-100'>
                  {faq.question}
                </dt>
                <dd className='mt-3 text-gray-600 dark:text-gray-400'>
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className='mt-8'>
          <h3>Have more questions? </h3>
          <p className='mt-4'>
            Please visit our <UnderlineLink href='/faq'>FAQ page</UnderlineLink>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
