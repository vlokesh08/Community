'use client'

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { CommentList } from "@/components/Dashboard/CommentList";
import { CreateCommentForm } from "@/components/Dashboard/CreateCommentForm";
import { VoteButtons } from "@/components/Dashboard/VoteButtons";
import { Skeleton } from "@/components/ui/skeleton";
import DiscussionLoader from "@/components/Loaders/DiscussionLoader";

interface PageProps {
    params: Promise<{
      id: string;
    }>;
}

export default function DiscussionDetail({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return response.json();
    },
  });

  if (isLoading) {
    return <DiscussionLoader />;
  }

  return (
    <div className="min-h-screen manrope bg-gray-50 dark:bg-dark-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-xl p-6">
          <div className="flex items-center space-x-4  text-sm text-gray-500 mb-2">
            <span>{post.isAnonymous ? "Anonymous" : post.author.name}</span>
            <span>•</span>
            <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-white ">{post.title}</h1>
          

          <div className="prose whitespace-pre-line text-sm max-w-none mb-4">{post.content}</div>

          <div className="flex items-center justify-between border-t pt-4">
            <VoteButtons postId={post.id} votes={post.votes} />
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments.length} comments</span>
            </div>
          </div>
        </div>

        <div className="mt-8 dark:bg-dark-card p-2">
          <CreateCommentForm postId={post.id} />
          <CommentList comments={post.comments} />
        </div>
      </div>
    </div>
  );
};
