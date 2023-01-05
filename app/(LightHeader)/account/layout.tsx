import { getAuth } from 'lib/auth';
import { useRouter } from 'next/navigation';

import { AccountSidebarNavigation } from '@/account/AccountSidebarNavigation';
import { Container } from '@/core/Container';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuth();
  const router = useRouter();
  if (!auth) router.push('/login');
  return (
    <Container className='px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16'>
      <main className='relative'>
        <div className='card-primary overflow-hidden bg-opacity-90 !p-0 shadow backdrop-blur-lg dark:bg-opacity-80'>
          <div className='divide-y divide-gray-100 dark:divide-gray-600/40 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x'>
            <AccountSidebarNavigation />
            {children}
          </div>
        </div>
      </main>
    </Container>
  );
}
