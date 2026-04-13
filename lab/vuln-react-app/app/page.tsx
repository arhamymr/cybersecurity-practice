import Navbar from "./components/Navbar";
import VulnerabilityCard from "./components/VulnerabilityCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🛡️ Web Vulnerability Lab
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive security laboratory for learning and practicing web
              vulnerabilities. Explore different attack vectors in a safe,
              educational environment.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-12">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-2xl">🚨</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-semibold">
                  WARNING: This is an educational environment
                </p>
                <p className="text-sm text-red-600 mt-1">
                  This lab contains intentional security vulnerabilities for
                  educational purposes only. Never test attacks on websites
                  without explicit permission.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Choose a Vulnerability Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <VulnerabilityCard
                title="Cross-Site Scripting (XSS)"
                description="Learn about XSS vulnerabilities including Reflected, DOM-based, Stored, and Event-based variants. Inject malicious scripts into web pages."
                severity="critical"
                icon="⚠️"
                href="/labs/xss"
              />
              <VulnerabilityCard
                title="SQL Injection (SQLi)"
                description="Coming Soon! Learn how to exploit database vulnerabilities through SQL injection attacks."
                severity="critical"
                icon="💉"
                href="#"
              />
              <VulnerabilityCard
                title="Cross-Site Request Forgery (CSRF)"
                description="Coming Soon! Understand how attackers can trick users into performing unwanted actions on authenticated websites."
                severity="high"
                icon="🎭"
                href="#"
              />
              <VulnerabilityCard
                title="Path Traversal"
                description="Coming Soon! Learn how to exploit file system vulnerabilities to access unauthorized files."
                severity="high"
                icon="📁"
                href="#"
              />
              <VulnerabilityCard
                title="Command Injection"
                description="Coming Soon! Execute arbitrary system commands through vulnerable applications."
                severity="critical"
                icon="⌨️"
                href="#"
              />
              <VulnerabilityCard
                title="More Coming Soon..."
                description="We're constantly adding new vulnerability types. Check back regularly for new labs!"
                severity="low"
                icon="🔜"
                href="#"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 How to Use This Lab
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                <strong>Choose a vulnerability category</strong> from the cards
                above
              </li>
              <li>
                <strong>Select a specific variant</strong> to explore different
                attack vectors
              </li>
              <li>
                <strong>Read the description</strong> to understand the
                vulnerability
              </li>
              <li>
                <strong>Use the hints</strong> if you need guidance on exploiting
                the vulnerability
              </li>
              <li>
                <strong>Test payloads</strong> to see how attacks work in
                practice
              </li>
              <li>
                <strong>Understand the impact</strong> and learn prevention
                techniques
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              🎓 Learning Objectives
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Identify</strong> common web application vulnerabilities
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Understand</strong> how attackers exploit these
                  vulnerabilities
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Practice</strong> exploitation techniques in a safe
                  environment
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  <strong>Learn</strong> how to prevent and mitigate these
                  vulnerabilities
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>
              Built with Next.js 16 | For educational purposes only |{" "}
              <a href="https://github.com" className="text-blue-600 hover:underline">
                Contribute on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
