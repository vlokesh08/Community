import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare } from 'lucide-react';

const DiscussionLoader = () => {
  return (
    <div className="min-h-screen manrope bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-neutral-900 shadow-sm rounded-lg p-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          
          <div className="flex items-center space-x-4 mb-2">
            <Skeleton className="h-4 w-24" />
            <span>•</span>
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageSquare className="w-5 h-5" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        <div className="mt-8 dark:bg-neutral-900 p-2">
          <Skeleton className="h-32 w-full mb-4 rounded-lg" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-neutral-700 py-2 px-5 rounded-lg">
                <div className="flex items-center space-x-4 mb-2">
                  <Skeleton className="h-4 w-24" />
                  <span>•</span>
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionLoader;