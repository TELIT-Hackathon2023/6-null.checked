"use client"

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";


export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <ClerkProvider
        appearance={{
          // baseTheme: resolvedTheme === "dark" ? dark : undefined,
          // baseTheme: dark,
        }}
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
        signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
        afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
        afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
      >
        {children}
      </ClerkProvider>
    </>
  )
}