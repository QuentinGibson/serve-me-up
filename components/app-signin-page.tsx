'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { initialFormState } from "@tanstack/react-form/nextjs"
import { mergeForm, useForm, useTransform } from "@tanstack/react-form"
import {z} from 'zod'
import { useActionState } from "react"
import { zodValidator } from "@tanstack/zod-form-adapter"
import signInFormSettings from "@/lib/signInFormSettings"
import { signInUser } from "@/lib/user"

export function Page() {
  const [state, action] = useActionState(signInUser, initialFormState)
  const form = useForm({
    ...signInFormSettings,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state])
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Welcome back to Serve Me Good
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action as never} onSubmit={() => form.handleSubmit()}>
            <div className="space-y-4">
              <div className="space-y-2">
                <form.Field
                  name="email"
                  validatorAdapter={zodValidator()}
                  validators={{
                    onChange: z.string(),
                  }}
                >
                  {(field) => (
                    <>
                      <Label htmlFor={field.name}>Email/Username</Label>
                      <Input id={field.name} name={field.name} type="email" required />
                    </>
                  )}
                </form.Field>
              </div>
              <div className="space-y-2">
                <form.Field
                  name="password"
                  validatorAdapter={zodValidator()}
                  validators={{
                    onChange: z.string()
                  }}
                >
                  {
                    (field) => (
                      <>
                        <Label htmlFor="password">Password</Label>
                        <Input id={field.name} name={field.name} type="password" required />
                      </>
                    )
                  }
                </form.Field>
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
          <div className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}