"use client"

import Link from "next/link"
import { ModeToggle } from "./theme-switch"
import { UserButton, useAuth } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { NavMenu } from "./nav-menu"
import { useEffect, useState } from "react"
import Logo from "./logo"

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { isSignedIn } = useAuth();
  
  useEffect(() => {
    setIsMounted(true)
  }, []);

  return (
    <div className="sticky flex z-30 top-0 w-full justify-between items-center py-2 px-12 backdrop-blur bg-background/10 border-b">
      <div className="flex items-center space-x-4">
        <Logo />
        <NavMenu />
      </div>
      <div className="flex space-x-2">
        <ModeToggle />
        <div className="flex items-center">
          {!isSignedIn && isMounted ? (
            <Link href="/sign-up">
              <Button variant="ghost" >
                <p>Get Started</p>
              </Button>
            </Link>
          ) : (
            <>
              <UserButton afterSignOutUrl="/"/>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar