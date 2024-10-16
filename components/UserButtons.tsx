import { getServerAuthSession } from '@/app/auth';
import LogInButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default async function UserButtons() {
  const session = await getServerAuthSession();
  if (session?.user) return <LogoutButton />
  return <LogInButton />
}
