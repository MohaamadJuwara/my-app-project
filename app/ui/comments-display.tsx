'use client';

import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  comment: string;
  created_at: string;
  is_active: boolean;
}

export function CommentsDisplay() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/comments');
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Comments</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Comments</h2>
        <div className="text-red-600 bg-red-50 p-4 rounded-md">
          <p>Error loading comments: {error}</p>
          <button 
            onClick={fetchComments}
            className="mt-2 text-sm text-red-700 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Comments</h2>
        <p className="text-gray-600">No comments yet. Be the first to leave a comment!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Comments</h2>
      <div className="space-y-4">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <p className="text-gray-800 mb-2">{comment.comment}</p>
            <p className="text-sm text-gray-500">
              Posted on {new Date(comment.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        ))}
        {comments.length > 5 && (
          <p className="text-sm text-gray-500 text-center">
            Showing 5 of {comments.length} comments
          </p>
        )}
      </div>
    </div>
  );
}
