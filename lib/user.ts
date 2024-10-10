'use server'

import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form/nextjs'
import signUpFormSettings from './signUpFormSettings'
import { db } from '@/db'
import bcrypt from 'bcrypt'
import { generateId } from 'lucia'
import { redirect } from 'next/navigation'

const serverValidate = createServerValidate({
  ...signUpFormSettings,
  onServerValidate: async ({ value }) => {
    try {
      const user = await db.user.findFirst({where: {username: value.username}})
      if (user) {
        return 'Username already taken'
      }
    } catch (error) {
      console.error(error)
    }
  },
})

export default async function someAction(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    // Some other error occurred while validating your form
    throw e
  }

  // Your form has successfully validated!
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password')
  const passwordHash = await bcrypt.hash(password as string, 15)

  if (!username || !email || !password) {

    throw new Error('Missing required fields')
  }


  try { 
     db.user.create({
      data: {
        id: generateId(10),
        username,
        confirmed: false,
        email,
        password: passwordHash,
      },
    })
    redirect("/login")
  } catch (e) {
    console.log(e)
  }
}
