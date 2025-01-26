'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { DiscussionList } from "@/components/Dashboard/DiscussionList";
import { CreatePostDialog } from "@/components/Dashboard/CreatePostDialog";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Discussions</h1>
          <Button onClick={() => setIsCreatePostOpen(true)}>
            Start Discussion
          </Button>
        </div>

        {/* <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        /> */}

        <DiscussionList categoryId={selectedCategory} />

        <CreatePostDialog
          open={isCreatePostOpen}
          onOpenChange={setIsCreatePostOpen}
        />
      </div>
    </div>
  );
};

export default Index;