'use client'

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Separator } from "../ui/separator";

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
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <div className="manrope">
      {postsData?.posts.map((post) => (
        <>
        <Link
          key={post.id}
          href={`/discussions/${post.id}`}
          className="flex align-middle justify-between bg-white dark:bg-neutral-800 shadow-sm py-3 px-6 hover:shadow-md transition-shadow"
        >
          <div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {post.title}
          </h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>{post.isAnonymous ? "Anonymous" : post.author?.name}</span>
            <span>•</span>
            <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
            <span>•</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              {post.category.name}
            </span>
          </div>
          </div>


          <div className="flex items-center gap-6 justify-between text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{post._count.votes}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{post._count.comments} comments</span>
            </div>
          </div>
        </Link>
          <Separator />
          </>
      ))}
    </div>
  );
};