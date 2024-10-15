"use client"
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export default function LogInButton() {
  return <Button onClick={() => signIn("github")}>Login</Button>;
}
