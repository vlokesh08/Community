'use client'

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Separator } from "../ui/separator";
import DiscussionPageLoader from "../Loaders/DiscussionPageLoader";
import React from "react";

// Add interface for type safety
interface Post {
  id: string;
  title: string;
  createdAt: string;
  isAnonymous: boolean;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
    image: string;
  } | null;
  _count: {
    comments: number;
    votes: number;
  };
}

interface PostsResponse {
  posts: Post[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
  };
}

export const DiscussionList = ({ categoryId }: { categoryId: string }) => {
  const { data: postsData, isLoading } = useQuery<PostsResponse>({
    queryKey: ["posts", categoryId],
    queryFn: async () => {
      const url = categoryId === "all" 
        ? "/api/posts"
        : `/api/posts?categoryId=${categoryId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <DiscussionPageLoader />
    );
  }

  return (
    <div className="manrope w-full">
      {postsData?.posts.map((post) => (
        <React.Fragment key={post.id}>
          <Link
            href={`/discussions/${post.id}`}
            className="block bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
                    {post.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-4">
                    <span className="inline-block">
                      {post.isAnonymous ? "Anonymous" : post.author?.name}
                    </span>
                    <span className="hidden sm:inline-block">•</span>
                    <span className="inline-block">
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </span>
                    <span className="hidden sm:inline-block">•</span>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs sm:text-sm">
                      {post.category.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post._count.votes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      <span className="hidden sm:inline">{post._count.comments} comments</span>
                      <span className="sm:hidden">{post._count.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Separator className="mt-0" />
        </React.Fragment>
      ))}
    </div>
  );
};