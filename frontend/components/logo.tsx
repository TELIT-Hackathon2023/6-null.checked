"use client"

import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary background-animate">
        MAGENTA
      </h1>
    </Link>
  )
}

export default Logo;