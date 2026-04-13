"use client";

import { useState, useEffect } from "react";
import Hint from "@/app/components/Hint";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export default function StoredXSS() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, content }),
      });

      if (response.ok) {
        setAuthor("");
        setContent("");
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearComments = async () => {
    try {
      await fetch("/api/comments", { method: "DELETE" });
      setComments([]);
    } catch (error) {
      console.error("Failed to clear comments:", error);
    }
  };

  const hints = [
    "Stored XSS is dangerous because the malicious payload is saved on the server and affects all users who view the content.",
    "Try injecting HTML tags with JavaScript: <img src=x onerror=alert(1)>",
    "Your payload will be visible to anyone viewing this page, making it much more dangerous than reflected XSS.",
    "Common test payloads: <script>alert(1)</script>, <img src=x onerror=alert(1)>, <svg onload=alert(1)>",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a
            href="/labs/xss"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <span>←</span>
            <span>Back to XSS Lab</span>
          </a>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💾 Stored XSS Vulnerability
          </h1>
          <p className="text-gray-600">
            Stored XSS (also called Persistent XSS) occurs when malicious input is
            saved on the server and displayed to other users without proper
            sanitization. This is the most dangerous type of XSS.
          </p>
        </div>

        {/* Comment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Leave a Comment
          </h2>
          <p className="text-gray-600 mb-4">
            Submit a comment. Your input will be stored and displayed to all users.
            Try injecting HTML/JavaScript!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
                placeholder="Your name..."
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Comment
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
                placeholder="Write your comment here... Try: <img src=x onerror=alert(1)>"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Comment"}
              </button>
              <button
                type="button"
                onClick={clearComments}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear All Comments
              </button>
            </div>
          </form>
        </div>

        {/* Comments Display */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Comments ({comments.length})
            </h2>
            <button
              onClick={fetchComments}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      <span dangerouslySetInnerHTML={{ __html: comment.author }} />
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Vulnerable Code Example */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            🚨 Why This is Vulnerable
          </h2>
          <p className="text-gray-600 mb-4">
            The comments are displayed using <code>dangerouslySetInnerHTML</code>{" "}
            without any sanitization. This means any HTML/JavaScript in the comment
            will be executed.
          </p>

          <div className="bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`// Frontend (React)
<div dangerouslySetInnerHTML={{ __html: comment.content }} />

// Backend (API Route)
export async function POST(request: NextRequest) {
  const { author, content } = await request.json();
  // No sanitization!
  store.addComment(author, content);
  return NextResponse.json({ success: true });
}`}</code>
            </pre>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-800">
            ⚠️ Impact of Stored XSS
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>
                <strong>Affects all users:</strong> Unlike reflected XSS, stored
                XSS impacts every user who views the compromised content
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>
                <strong>Persistent:</strong> The malicious payload remains on the
                server until manually removed
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>
                <strong>Cookie theft:</strong> Attackers can steal session cookies
                and hijack user accounts
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>
                <strong>Keylogging:</strong> Can capture keystrokes and passwords
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>
                <strong>Phishing:</strong> Can inject fake login forms to steal
                credentials
              </span>
            </li>
          </ul>
        </div>

        <Hint
          title="💡 Stored XSS Hints"
          hints={hints}
          code='<img src=x onerror=alert("XSS")>'
        />
      </div>
    </div>
  );
}
