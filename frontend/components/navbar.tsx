"use client"

import Link from "next/link"
import { ModeToggle } from "./theme-switch"
import { UserButton, useAuth } from "@clerk/nextjs"
import { Button } from "./ui/button"

const Navbar = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <div className="sticky flex top-0 w-full justify-between p-4 backdrop-blur bg-background/10 ">
      <Link href="/" className="flex items-center">
        <h1 className="text-2xl font-bold">
          NONAME
        </h1>
      </Link>
      <div className="flex  space-x-2">
        <ModeToggle />
        <div className="flex items-center gap-x-2">
          {!isSignedIn ? (
            <Link href="/sign-up">
              <Button variant="outline" >
                Get Started
              </Button>
            </Link>
          ) : (
            <>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar