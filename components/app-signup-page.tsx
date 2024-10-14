'use client';

import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mergeForm, useTransform, useForm } from '@tanstack/react-form';
import { initialFormState } from '@tanstack/react-form/nextjs';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import FieldInfo from './FIeldInfo';
import { Button } from './ui/button';
import signUpFormSettings from '@/lib/signUpFormSettings';
import { signUpUser } from '@/lib/user';

export default function Page() {
  const [state, action] = useActionState(signUpUser, initialFormState);
  const form = useForm({
    ...signUpFormSettings,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <Card className="w-full max-w-md relative z-10 bg-white bg-opacity-90">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Sign Up for Serve Me Good
          </CardTitle>
          <CardDescription>
            Join our movie-loving community today!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={action as never}
            onSubmit={() => form.handleSubmit()}
            className="space-y-4"
          >
            <div className="space-y-2">
              <form.Field
                name="username"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string().min(3).max(20),
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Username</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="johndoe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>
            <div className="space-y-2">
              <form.Field
                name="email"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string().min(3).max(100),
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      name={field.name}
                      placeholder="john@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>
            <div className="space-y-2">
              <form.Field
                name="password"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z
                    .string()
                    .min(8, {
                      message: `Password must be at least 8 characters`,
                    })
                    .max(50, {
                      message: `Password must be at most 50 characters`,
                    })
                    .regex(/[A-Z]/, {
                      message:
                        'Password must contain at least one uppercase letter',
                    })
                    .regex(/[a-z]/, {
                      message:
                        'Password must contain at least one lowercase letter',
                    })
                    .regex(/\d/, {
                      message: 'Password must contain at least one digit',
                    })
                    .regex(/[!@#$%^&*]/, {
                      message:
                        'Password must contain at least one special character',
                    }),
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      type="password"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>
            <div className="space-y-2">
              <form.Field
                name="confirm_password"
                validatorAdapter={zodValidator()}
                validators={{
                  onChangeListenTo: ['password'],
                  onChange: ({ value, fieldApi }) => {
                    if (value !== fieldApi.form.getFieldValue('password')) {
                      return 'Passwords do not match';
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Confirm Password</Label>
                    <Input
                      id={field.name}
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Sign Up'}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/signIn" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
