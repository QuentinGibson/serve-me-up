"use server";

import {
  FormState,
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import signUpFormSettings from "./signUpFormSettings";
import { db } from "@/db";
import bcrypt from "bcrypt";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import signInFormSettings from "./signInFormSettings";
import { lucia } from "@/auth";

const signUpValidate = createServerValidate({
  ...signUpFormSettings,
  onServerValidate: async ({ value }) => {
    try {
      const user = await db.user.findFirst({
        where: { username: value.username },
      });
      if (user) {
        return "Username already taken";
      }
    } catch (error) {
      console.error(error);
    }
  },
});

const signInValidate = createServerValidate({
  ...signInFormSettings,
  onServerValidate: async ({ value }) => {
    try {
      // Try to find the user by email
      const user = await db.user.findFirst({
        where: {
          email: value.email,
        },
      });

      if (!user) {
        // Try to find the user by username
        const username = await db.user.findFirst({
          where: {
            username: value.email,
          },
        });

        if (!username) {
          return "Failed to login with the provided credentials";
        }
        const passwordMatch = await bcrypt.compare(
          value.password,
          username.password,
        );
        if (!passwordMatch) {
          return "Failed to login with the provided credentials";
        }
      }

      if (user) {
        const passwordMatch = await bcrypt.compare(
          value.password,
          user.password,
        );
        if (!passwordMatch) {
          return "Failed to login with the provided credentials";
        }
      }

      return "Failed to login with the provided credentials";
    } catch (error) {
      console.error(error);
    }
  },
});

export async function signUpUser(prev: unknown, formData: FormData) {
  try {
    await signUpValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  // Your form has successfully validated!

  // Gather the form data
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Check if the required fields are missing
  if (!username || !email || !password) {
    throw new Error("Missing required fields");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(15);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    // Save the user to the database
    await db.user.create({
      data: {
        id: generateId(10),
        username,
        confirmed: false,
        email,
        password: passwordHash,
      },
    });

    // Redirect to the login page
    redirect("/login");
  } catch (e) {
    console.log(e);
    if (e instanceof PrismaClientValidationError) {
      console.log(e.message);
    }
  }
}

export async function signInUser(prev: unknown, formData: FormData) {
  try {
    await signInValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  // Your form has successfully validated!
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  let user;

  user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    user = await db.user.findFirst({
      where: {
        username: email,
      },
    });
  }

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const session = lucia.createSession(user.id, {
    username: user.username,
    email: user.email,
    confirmed: user.confirmed,
    userId: user.id,
  });

  // Redirect to the dashboard
  redirect("/dashboard");
}
