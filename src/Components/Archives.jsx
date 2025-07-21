import React from 'react'
import {MoveRight} from "lucide-react"

const Archives = () => {
  return (
    <div className="bg-white p-4 border  border-[#E8E6E6] rounded-lg">
    <h3 className="text-[20px] text-[#001430] font-semibold mb-2">
      Archives
    </h3>
    <hr className="h-1 w-10 bg-amber-500 rounded-lg border-none mb-4" />
    <div className="group flex items-center gap-2 cursor-pointer">
      <MoveRight
        size={16}
        className="text-[#00BBAE] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
      />
      <h3 className="text-gray-500 bold group-hover:text-[#00BBAE] group-hover:translate-x-2 transition-all">
        December 2023 (14)
      </h3>
    </div>
  </div>
  )
}

export default Archives