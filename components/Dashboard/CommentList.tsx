import { format } from "date-fns";
import { useState } from "react";

export const CommentList = ({ comments }: { comments: any[] }) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const handleReplySubmit = async (parentId: string) => {
    try {
      const response = await fetch("/api/posts/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: comments[0]?.postId,
          parentId,
          content: replyContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit reply");
      }

      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const renderComment = (comment: any, depth = 0) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedComments.has(comment.id);

    return (
      <div key={comment.id} className="relative">
        <div className={`flex ${depth > 0 ? "ml-4" : ""}`}>
          {/* Vertical line for nested comments */}
          {depth > 0 && (
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 hover:bg-blue-500 cursor-pointer" />
          )}
          
          <div className="flex-grow">
            <div className="bg-white dark:bg-neutral-700 py-2 px-5">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-1">
                <span className="font-medium dark:text-gray-200">{comment.author.name}</span>
                <span>•</span>
                <span>{format(new Date(comment.createdAt), "MMM d, yyyy")}</span>
              </div>
              
              <p className="text-gray-900 dark:text-gray-200">{comment.content}</p>
              
              <div className="flex items-center space-x-4 mt-1">
                {depth === 0 && (
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-gray-500 hover:text-blue-600"
                  >
                    Reply
                  </button>
                )}
                
                {hasReplies && (
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="text-sm text-gray-500 hover:text-blue-600 flex items-center space-x-1"
                  >
                    <span>{isExpanded ? "Hide" : "Show"}</span>
                    <span className="text-gray-400">
                      {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                    </span>
                  </button>
                )}
              </div>

              {/* {replyingTo === comment.id && (
                <div className="mt-3">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your reply..."
                    rows={3}
                  />
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleReplySubmit(comment.id)}
                      className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent("");
                      }}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )} */}
            </div>

            {/* Render replies if expanded */}
            {hasReplies && isExpanded && (
              <div className="">
                {comment.replies.map((reply: any) => renderComment(reply, depth + 1))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {comments.map((comment) => renderComment(comment))}
    </div>
  );
};

export default CommentList;