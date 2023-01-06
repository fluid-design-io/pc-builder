import { BACKEND_URL } from 'lib/pb';
import { getAuth } from 'lib/auth';
import { AccountSettings } from '@/account/AccountSettings';
import { BaseAuthStore } from 'pocketbase';

const getUser = async ({ auth }: { auth: BaseAuthStore }) => {
  if (!auth) return null;
  try {
    const res = await fetch(
      `https://billowing-hill-1662.fly.dev/api/collections/users/records/${auth.model.id}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    const data = await res.json();
    return { ...data, token: auth.token };
  } catch (error) {
    console.log(error);
  }
};

export default async function Page() {
  const auth = await getAuth();
  const user = await getUser({ auth });

  return (
    <div className='lg:col-span-9'>
      <h2 className='mt-8 px-4 tracking-wide sm:px-6 md:mt-10 lg:mt-12'>
        Settings
      </h2>
      {user && <AccountSettings user={user} />}
    </div>
  );
}
