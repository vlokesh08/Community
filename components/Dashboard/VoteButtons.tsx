'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp, ThumbsDown, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const VoteButtons = ({
  postId,
  votes,
}: {
  postId: string;
  votes: any[];
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: vote } = useMutation({
    mutationFn: async (value: number) => {
      const response = await fetch("/api/posts/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, value }),
      });
      if (!response.ok) throw new Error("Failed to vote");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: () => {
      toast({
        title: "Failed to vote",
        variant: "destructive",
      });
    },
  });

  const upvotes = votes.filter((v) => v.value > 0).length;
  const downvotes = votes.filter((v) => v.value < 0).length;

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => vote(1)}
        className="space-x-2"
      >
        <ArrowBigUp className="w-6 h-6" />
        <span>{upvotes}</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => vote(-1)}
        className="space-x-2"
      >
        <ArrowBigDown className="w-6 h-6" />
        <span>{downvotes}</span>
      </Button>
    </div>
  );
};