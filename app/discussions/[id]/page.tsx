'use client'
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { CommentList } from "@/components/Dashboard/CommentList";
import { CreateCommentForm } from "@/components/Dashboard/CreateCommentForm";
import { VoteButtons } from "@/components/Dashboard/VoteButtons";
import { Skeleton } from "@/components/ui/skeleton";
interface PageProps {
    params: {
      id: string;
    };
  }
const DiscussionDetail = ({ params }: PageProps) => {
  const { id } = params;
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return response.json();
    },
  });

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <div className="min-h-screen manrope bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-neutral-800 shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-white ">{post.title}</h1>
          
          <div className="flex items-center space-x-4  text-sm text-gray-500 mb-2">
            <span>{post.isAnonymous ? "Anonymous" : post.author.name}</span>
            <span>•</span>
            <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
          </div>

          <div className="prose max-w-none mb-4">{post.content}</div>

          <div className="flex items-center justify-between border-t pt-4">
            <VoteButtons postId={post.id} votes={post.votes} />
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments.length} comments</span>
            </div>
          </div>
        </div>

        <div className="mt-8 dark:bg-neutral-800 p-2">
          <CreateCommentForm postId={post.id} />
          <CommentList comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;