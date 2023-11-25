"use client"

import { proposals } from "./scrollable-rfps"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const ToolbarRFP = () => {
  return (
    <div className="flex w-96 justify-between space-x-4 mb-4">
      <Input
          placeholder="Filter proposals..."
          // value={(proposals.("email")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("email")?.setFilterValue(event.target.value)
          // }
          className="w-full"
        />
      <Button>Upload proposal</Button>
    </div>
  )
}

export default ToolbarRFP