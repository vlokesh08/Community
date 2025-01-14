import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export const CreatePostDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async () => {
      console.log({ title, content, categoryId, isAnonymous });
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, categoryId, isAnonymous }),
      });
      if (!response.ok) throw new Error("Failed to create post");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({ title: "Post created successfully!" });
      onOpenChange(false);
      router.push(`/discussions/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Failed to create post",
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Discussion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          <Select 
            value={categoryId} 
            onValueChange={(value) => {
              console.log('Selected category:', value);
              setCategoryId(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Software Development</SelectItem>
              <SelectItem value="cm5tikutz00008nkbfm858q38">DSA</SelectItem>
              <SelectItem value="3">System Design</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Post anonymously</span>
            <Switch
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
          </div>
          <Button
            className="w-full"
            onClick={() => createPost()}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Discussion"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};