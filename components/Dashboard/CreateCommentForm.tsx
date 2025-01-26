'use client'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const CreateCommentForm = ({
  postId,
  parentId,
}: {
  postId: string;
  parentId?: string;
}) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/posts/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, parentId, content }),
      });
      if (!response.ok) throw new Error("Failed to create comment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      setContent("");
      toast({ title: "Comment added successfully!" });
    },
    onError: () => {
      toast({
        title: "Failed to add comment",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] dark:bg-dark-button rounded-xl border dark:border-gray-600"
      />
      <Button
        onClick={() => createComment()}
        disabled={isPending || !content.trim()}
      >
        {isPending ? "Posting..." : "Post Comment"}
      </Button>
    </div>
  );
};