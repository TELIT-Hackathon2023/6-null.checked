"use client"

import Link from "next/link"
import { ModeToggle } from "./theme-switch"
import { UserButton, useAuth } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { NavMenu } from "./nav-menu"

const Navbar = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <div className="sticky flex z-30 top-0 w-full justify-between items-center py-2 px-12 backdrop-blur bg-background/10 border-b">
      <Link href="/" className="flex items-center">
        <h1 className="text-2xl font-bold">
          NONAME
        </h1>
      </Link>
      <NavMenu />
      <div className="flex space-x-2">
        <ModeToggle />
        <div className="flex items-center">
          {!isSignedIn ? (
            <Link href="/sign-up">
              <Button variant="ghost" >
                <p>Get Started</p>
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