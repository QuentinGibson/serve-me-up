import { getServerAuthSession } from '@/auth';
import { Button } from './ui/button';
import Link from 'next/link';
import LogInButton from './LoginButton';

export default async function UserButtons() {
  const session = await getServerAuthSession();
  console.log(`Session: ${session}`)
  if (session?.user) return (
    <Link href={'/api/auth/signout'}>
      <Button>Logout</Button>;
    </Link>
  );
  return (
    <>
      <LogInButton />
    </>
  );
}
