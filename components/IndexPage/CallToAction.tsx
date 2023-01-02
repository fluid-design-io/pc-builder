import backgroundImageLight from '~/assets/images/background-call-to-action-light.jpg';
import backgroundImageDark from '~/assets/images/background-call-to-action-dark.jpg';
import { Container } from '@/core/Container';
import { Button } from '@/buttons/AppButton';
import { DynamicImage } from '@/core/DynamicImage';

export function CallToAction() {
  return (
    <section
      id='get-started-today'
      className='relative overflow-hidden bg-blue-600 py-32'
    >
      <DynamicImage
        className='absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2'
        src={{ light: backgroundImageLight, dark: backgroundImageDark }}
        width={2347}
        height={1244}
        placeholder='blur'
      />
      <Container className='relative'>
        <div className='mx-auto max-w-lg text-center'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl'>
            Start your build today
          </h2>
          <p className='mt-4 text-lg tracking-tight text-white'>
            It's time to start building your dream PC. We'll help you every step
            of the way. Our professional support team is here to help you with
            any questions you might have.
          </p>
          <Button href='/build' color='white' className='mt-10 uppercase'>
            Let's go
          </Button>
        </div>
      </Container>
    </section>
  );
}
