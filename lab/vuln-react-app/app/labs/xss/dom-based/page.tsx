"use client";

import { useState, useEffect } from "react";
import Hint from "@/app/components/Hint";

export default function DOMBasedXSS() {
  const [hashContent, setHashContent] = useState("");
  const [urlFragment, setUrlFragment] = useState("");
  const [innerHTMLInput, setInnerHTMLInput] = useState("");
  const [displayContent, setDisplayContent] = useState("");

  useEffect(() => {
    setHashContent(window.location.hash.substring(1));
  }, []);

  const handleHashChange = () => {
    const newHash = window.location.hash.substring(1);
    setHashContent(newHash);
  };

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleUrlFragmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlFragment(urlFragment);
    const url = new URL(window.location.href);
    url.hash = urlFragment;
    window.history.pushState({}, "", url.toString());
    setHashContent(urlFragment);
  };

  const handleInnerHtmlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayContent(innerHTMLInput);
  };

  const handleDataAttribute = (content: string) => {
    const element = document.getElementById("data-target");
    if (element) {
      element.innerHTML = content;
    }
  };

  const hints = [
    "DOM-based XSS occurs when the DOM is modified in an unsafe way using untrusted data.",
    "The URL hash (#fragment) can be manipulated. Try adding #<img src=x onerror=alert(1)> to the URL",
    "innerHTML is dangerous because it parses HTML. Try: <img src=x onerror=alert(1)>",
    "Data attributes from user input can also be dangerous if inserted into innerHTML",
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
            🌐 DOM-based XSS Vulnerabilities
          </h1>
          <p className="text-gray-600">
            DOM-based XSS occurs when the JavaScript execution environment in a
            browser is modified in an unsafe way, allowing untrusted data to be
            executed as code.
          </p>
        </div>

        {/* Hash-based XSS */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 1: URL Hash Fragment
          </h2>
          <p className="text-gray-600 mb-4">
            The URL hash is read and displayed using innerHTML. Try adding this to
            the URL:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              #<code>&lt;img src=x onerror=alert(1)&gt;</code>
            </code>
          </p>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">URL Hash content:</p>
            <div
              id="hash-display"
              dangerouslySetInnerHTML={{ __html: hashContent }}
            />
          </div>

          <form onSubmit={handleUrlFragmentSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={urlFragment}
                onChange={(e) => setUrlFragment(e.target.value)}
                placeholder="Enter HTML to put in URL hash..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Update Hash
              </button>
            </div>
          </form>
        </div>

        {/* innerHTML usage */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 2: Direct innerHTML Assignment
          </h2>
          <p className="text-gray-600 mb-4">
            User input is directly assigned to innerHTML without sanitization.
            This is one of the most common DOM XSS vulnerabilities.
          </p>

          <form onSubmit={handleInnerHtmlSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={innerHTMLInput}
                onChange={(e) => setInnerHTMLInput(e.target.value)}
                placeholder="Enter HTML to render..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Render HTML
              </button>
            </div>
          </form>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Rendered content:</p>
            <div dangerouslySetInnerHTML={{ __html: displayContent }} />
          </div>

          <div className="mt-4 bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`element.innerHTML = userInput;`}</code>
            </pre>
          </div>
        </div>

        {/* dangerouslySetInnerHTML */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 3: React dangerouslySetInnerHTML
          </h2>
          <p className="text-gray-600 mb-4">
            React's dangerouslySetInnerHTML bypasses React's built-in XSS
            protection and should never be used with user input.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDataAttribute(innerHTMLInput);
            }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={innerHTMLInput}
                onChange={(e) => setInnerHTMLInput(e.target.value)}
                placeholder="Enter HTML for data attribute..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Insert via Data Attribute
              </button>
            </div>
          </form>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Data attribute content:</p>
            <div id="data-target" className="min-h-[50px] border border-dashed border-gray-300 p-2" />
          </div>
        </div>

        {/* eval usage */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 4: Unsafe eval() Usage
          </h2>
          <p className="text-gray-600 mb-4">
            Using eval() with user input allows arbitrary code execution.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              try {
                eval(innerHTMLInput);
              } catch (err) {
                console.error(err);
              }
            }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={innerHTMLInput}
                onChange={(e) => setInnerHTMLInput(e.target.value)}
                placeholder="Enter JavaScript to execute..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Execute
              </button>
            </div>
          </form>

          <div className="bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`eval(userInput);`}</code>
            </pre>
          </div>
        </div>

        <Hint
          title="💡 DOM-based XSS Hints"
          hints={hints}
          code="#<img src=x onerror=alert(1)>"
        />
      </div>
    </div>
  );
}
