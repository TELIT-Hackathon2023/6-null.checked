"use client"

import { proposals } from "./scrollable-rfps"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Props {
  isLoading: boolean
}

const ToolbarRFP = ({isLoading}: Props) => {
  return (
    <div className={`${isLoading ? "pointer-events-none opacity-50" : ""} flex w-96 justify-between space-x-4 mb-4`}>
      <Input
          placeholder="Filter proposals..."
          className="w-full"
        />
      <Button disabled={isLoading}>Upload file</Button>
    </div>
  )
}

export default ToolbarRFP