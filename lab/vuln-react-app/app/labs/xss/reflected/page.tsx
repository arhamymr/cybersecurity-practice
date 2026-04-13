"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Hint from "@/app/components/Hint";

function ReflectedXSSContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [urlParam, setUrlParam] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  useEffect(() => {
    setUrlParam(searchParams.get("q") || "");
    setAttributeValue(searchParams.get("attr") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchQuery);
    window.history.pushState({}, "", url.toString());
    setUrlParam(searchQuery);
  };

  const handleAttributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("attr", attributeValue);
    window.history.pushState({}, "", url.toString());
    setAttributeValue(attributeValue);
  };

  const hints = [
    "Reflected XSS occurs when user input is immediately reflected back without proper sanitization.",
    "Try injecting HTML tags that contain JavaScript, such as <script>alert(1)</script> or <img src=x onerror=alert(1)>",
    "For attribute injection, try closing the attribute first: \" onload=alert(1) or \" onmouseover=alert(1)",
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
            🔍 Reflected XSS Vulnerabilities
          </h1>
          <p className="text-gray-600">
            Reflected XSS occurs when untrusted data is immediately included in the
            application's response without proper validation or escaping.
          </p>
        </div>

        {/* Basic Reflected XSS */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 1: Basic URL Parameter Reflection
          </h2>
          <p className="text-gray-600 mb-4">
            The search query is reflected directly in the HTML without sanitization.
            Try:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              ?q=<code>&lt;img src=x onerror=alert(1)&gt;</code>
            </code>
          </p>

          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search query..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Search results for:</p>
            <div className="text-lg">
              {urlParam && (
                <div dangerouslySetInnerHTML={{ __html: urlParam }} />
              )}
            </div>
          </div>
        </div>

        {/* Attribute-based Reflected XSS */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 2: Attribute Injection
          </h2>
          <p className="text-gray-600 mb-4">
            User input is placed in an HTML attribute without proper escaping. Try:
            <code className="bg-gray-100 px-2 py-1 rounded ml-2">
              ?attr="<code>&quot; onload=alert(1)</code>
            </code>
          </p>

          <form onSubmit={handleAttributeSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={attributeValue}
                onChange={(e) => setAttributeValue(e.target.value)}
                placeholder="Enter value for attribute..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Your input in attribute:</p>
            <img
              src="/next.svg"
              alt={attributeValue || "placeholder"}
              className="h-10"
            />
          </div>
        </div>

        {/* JavaScript Context */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 3: JavaScript Context
          </h2>
          <p className="text-gray-600 mb-4">
            Input reflected in JavaScript code context. Try breaking out of quotes
            or using template literals.
          </p>

          <div className="bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`const userInput = "${urlParam || ""}";`}</code>
            </pre>
          </div>
        </div>

        <Hint
          title="💡 Reflected XSS Hints"
          hints={hints}
          code='<img src=x onerror=alert(1)> or <script>alert(1)</script>'
        />
      </div>
    </div>
  );
}

export default function ReflectedXSS() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <ReflectedXSSContent />
    </Suspense>
  );
}
