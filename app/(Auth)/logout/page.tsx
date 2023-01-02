'use client';

import { pb } from 'lib/pb';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  pb.authStore.clear();

  const logoutServer = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      router.push('/');
    }
  };

  logoutServer();

  return <p>You have been logged out.</p>;
}
