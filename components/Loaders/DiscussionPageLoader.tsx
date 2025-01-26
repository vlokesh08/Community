import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const DiscussionPageLoader = () => {
  return (
    <div className="manrope">
      {/* Adding 3-4 Skeleton loaders */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex align-middle justify-between bg-white dark:bg-dark-card shadow-sm py-3 px-6">
          <div className="flex-1">
            <Skeleton className="h-6 mb-2 bg-gray-300 dark:bg-neutral-700" />
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-neutral-700" />
              <span>•</span>
              <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-neutral-700" />
              <span>•</span>
              <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-neutral-700" />
            </div>
          </div>
          <div className="flex items-center gap-6 justify-between text-gray-500">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 bg-gray-300 dark:bg-neutral-700" />
              <Skeleton className="h-4 w-10 bg-gray-300 dark:bg-neutral-700" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="w-4 h-4 bg-gray-300 dark:bg-neutral-700" />
              <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-neutral-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DiscussionPageLoader