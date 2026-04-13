import Navbar from "@/app/components/Navbar";
import VulnerabilityCard from "@/app/components/VulnerabilityCard";

export default function XSSLandingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <span>←</span>
                <span>Back to Main Menu</span>
              </a>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ⚠️ Cross-Site Scripting (XSS) Lab
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Learn about Cross-Site Scripting vulnerabilities through hands-on
              practice. Each lab demonstrates a different type of XSS attack vector.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is XSS?
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Cross-Site Scripting (XSS)</strong> is a security vulnerability
              that allows attackers to inject malicious scripts into web pages
              viewed by other users. When a victim views the compromised page, the
              malicious script executes in their browser context.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">
                  🔍 Reflected XSS
                </h3>
                <p className="text-sm text-blue-700">
                  Malicious script is reflected off a web server, such as in an
                  error message or search result.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <h3 className="font-semibold text-purple-900 mb-2">
                  🌐 DOM-based XSS
                </h3>
                <p className="text-sm text-purple-700">
                  Vulnerability exists in client-side code rather than server-side
                  code.
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded">
                <h3 className="font-semibold text-orange-900 mb-2">
                  💾 Stored XSS
                </h3>
                <p className="text-sm text-orange-700">
                  Malicious script is permanently stored on the target server and
                  affects all users.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Choose an XSS Variant
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <VulnerabilityCard
                title="Reflected XSS"
                description="Learn how URL parameters can be exploited to inject malicious scripts that are immediately reflected back to the user. Includes basic reflection, attribute injection, and JavaScript context variants."
                severity="high"
                icon="🔍"
                href="/labs/xss/reflected"
              />
              <VulnerabilityCard
                title="DOM-based XSS"
                description="Explore client-side vulnerabilities where the DOM is unsafely modified. Covers URL hash fragments, innerHTML manipulation, dangerouslySetInnerHTML, and unsafe eval() usage."
                severity="high"
                icon="🌐"
                href="/labs/xss/dom-based"
              />
              <VulnerabilityCard
                title="Event-based XSS"
                description="Discover how JavaScript event handlers can be weaponized. Learn about javascript: protocol, SVG embedded scripts, onerror handlers, iframe srcdoc, and onload events."
                severity="high"
                icon="⚡"
                href="/labs/xss/event-based"
              />
              <VulnerabilityCard
                title="Stored XSS"
                description="The most dangerous XSS variant. Inject persistent payloads that affect all users. Features a comment system where your input is saved and displayed without sanitization."
                severity="critical"
                icon="💾"
                href="/labs/xss/stored"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              💡 Common Test Payloads
            </h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <code className="bg-gray-100 px-2 py-1 rounded">
                &lt;script&gt;alert(1)&lt;/script&gt;
              </code>
              <code className="bg-gray-100 px-2 py-1 rounded">
                &lt;img src=x onerror=alert(1)&gt;
              </code>
              <code className="bg-gray-100 px-2 py-1 rounded">
                &lt;svg onload=alert(1)&gt;
              </code>
              <code className="bg-gray-100 px-2 py-1 rounded">
                javascript:alert(1)
              </code>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-semibold text-yellow-900 mb-2">
                🎯 Learning Tips
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Start with Reflected XSS to understand the basics</li>
                <li>• Use browser DevTools to inspect the DOM</li>
                <li>• Read the hints if you get stuck</li>
                <li>• Try different payloads to see what works</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
