'use client';

import { useUser } from 'lib/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();
  const { clearUser } = useUser();

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

  useEffect(() => {
    clearUser();
    logoutServer();
  }, []);

  return <p>You have been logged out.</p>;
}
