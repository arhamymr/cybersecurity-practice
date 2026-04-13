"use client";

import { useState } from "react";
import Hint from "@/app/components/Hint";

export default function EventBasedXSS() {
  const [hrefValue, setHrefValue] = useState("");
  const [svgContent, setSvgContent] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [onErrorInput, setOnErrorInput] = useState("");

  const hints = [
    "Event-based XSS uses JavaScript event handlers to execute malicious code.",
    "The javascript: protocol in href attributes can execute arbitrary JavaScript.",
    "SVG elements can contain embedded scripts using onload or other event handlers.",
    "The onerror event handler executes when an error occurs, such as an invalid image source.",
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
            ⚡ Event-based XSS Vulnerabilities
          </h1>
          <p className="text-gray-600">
            Event-based XSS occurs when JavaScript event handlers are triggered by
            user actions or page events, executing malicious code.
          </p>
        </div>

        {/* javascript: protocol in href */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 1: javascript: Protocol in href
          </h2>
          <p className="text-gray-600 mb-4">
            User input is placed in an href attribute without validation. Try:
            <code className="bg-gray-100 px-2 py-1 rounded ml-2">
              javascript:alert(1)
            </code>
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const url = new URL(window.location.href);
              url.searchParams.set("href", hrefValue);
              window.history.pushState({}, "", url.toString());
            }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={hrefValue}
                onChange={(e) => setHrefValue(e.target.value)}
                placeholder="Enter URL (try: javascript:alert(1))"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Create Link
              </button>
            </div>
          </form>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Generated link:</p>
            <a
              href={hrefValue || "#"}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Click me (potentially dangerous)
            </a>
          </div>

          <div className="mt-4 bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`<a href="${hrefValue || "user_input"}">Click me</a>`}</code>
            </pre>
          </div>
        </div>

        {/* SVG with embedded scripts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 2: SVG Embedded Scripts
          </h2>
          <p className="text-gray-600 mb-4">
            SVG elements can contain JavaScript in event handlers. Try:
            <code className="bg-gray-100 px-2 py-1 rounded ml-2">
              &lt;svg onload=alert(1)&gt;
            </code>
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={svgContent}
                onChange={(e) => setSvgContent(e.target.value)}
                placeholder="Enter SVG content..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  const container = document.getElementById("svg-container");
                  if (container) {
                    container.innerHTML = svgContent;
                  }
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Render SVG
              </button>
            </div>
          </form>

          <div
            id="svg-container"
            className="bg-gray-50 p-4 rounded border border-gray-200 min-h-[100px]"
          />

          <div className="mt-4 bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`element.innerHTML = userInput; // userInput = "<svg onload=alert(1)>"`}</code>
            </pre>
          </div>
        </div>

        {/* onerror event handler */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 3: Image onerror Event Handler
          </h2>
          <p className="text-gray-600 mb-4">
            The onerror event triggers when an image fails to load. The source can
            be user-controlled.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={onErrorInput}
                onChange={(e) => setOnErrorInput(e.target.value)}
                placeholder="Enter image onerror attribute (try: alert(1))"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  const container = document.getElementById("img-container");
                  if (container) {
                    container.innerHTML = `<img src="invalid.jpg" onerror="${onErrorInput}" />`;
                  }
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Create Image
              </button>
            </div>
          </form>

          <div
            id="img-container"
            className="bg-gray-50 p-4 rounded border border-gray-200 min-h-[100px]"
          />

          <div className="mt-4 bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`<img src="invalid.jpg" onerror="${onErrorInput}" />`}</code>
            </pre>
          </div>
        </div>

        {/* iframe srcdoc */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 4: iframe srcdoc with HTML
          </h2>
          <p className="text-gray-600 mb-4">
            The srcdoc attribute of iframes can contain arbitrary HTML, including
            scripts.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={iframeSrc}
                onChange={(e) => setIframeSrc(e.target.value)}
                placeholder="Enter HTML for iframe (try: <script>alert(1)</script>)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  const iframe = document.getElementById("test-iframe") as HTMLIFrameElement;
                  if (iframe) {
                    iframe.srcdoc = iframeSrc;
                  }
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Update iframe
              </button>
            </div>
          </form>

          <iframe
            id="test-iframe"
            className="w-full h-32 bg-gray-50 border border-gray-200 rounded"
            title="Test iframe"
          />

          <div className="mt-4 bg-gray-900 p-4 rounded">
            <p className="text-green-400 text-sm mb-2">Vulnerable Code:</p>
            <pre className="text-gray-300 text-sm">
              <code>{`iframe.srcdoc = userInput;`}</code>
            </pre>
          </div>
        </div>

        {/* onload attribute */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Variant 5: Body onload Event
          </h2>
          <p className="text-gray-600 mb-4">
            The onload attribute executes when the element finishes loading. Try:
            <code className="bg-gray-100 px-2 py-1 rounded ml-2">alert(1)</code>
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={onErrorInput}
                onChange={(e) => setOnErrorInput(e.target.value)}
                placeholder="Enter onload handler code..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  const container = document.getElementById("onload-container");
                  if (container) {
                    const div = document.createElement("div");
                    div.setAttribute("onload", onErrorInput);
                    container.innerHTML = "";
                    container.appendChild(div);
                    div.dispatchEvent(new Event("load"));
                  }
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Trigger onload
              </button>
            </div>
          </form>

          <div
            id="onload-container"
            className="bg-gray-50 p-4 rounded border border-gray-200 min-h-[50px]"
          />
        </div>

        <Hint
          title="💡 Event-based XSS Hints"
          hints={hints}
          code="javascript:alert(1) or <svg onload=alert(1)>"
        />
      </div>
    </div>
  );
}
