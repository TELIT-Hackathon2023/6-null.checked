"use client"

import { useState } from "react"
import { proposals } from "./scrollable-rfps"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Props {
  isLoading: boolean
}

const ToolbarRFP = ({isLoading}: Props) => {
  // const [isAscending, setIsAscending] = useState<boolean>(true)
  return (
    <div className={`${isLoading ? "pointer-events-none opacity-50" : ""} flex w-96 justify-between space-x-4 mb-4`}>
      <Input
          placeholder="Filter proposals..."
          // value={(proposals.("email")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("email")?.setFilterValue(event.target.value)
          // }
          className="w-full"
        />
      <Button disabled={isLoading}>Upload file</Button>
      {/* { }
      <ArrowUpNarrowWideIcon />
      <ArrowDownNarrowWideIcon /> */}
    </div>
  )
}

export default ToolbarRFP