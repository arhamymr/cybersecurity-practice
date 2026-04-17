# WebSec Scanner Scripts

Browser-based security scanner that detects exposed secrets, XSS vulnerabilities, sensitive endpoints, and security misconfigurations in web applications.

## Files

### `websec-scanner.js`
Full-featured JavaScript scanner with comprehensive security checks.

### `websec-scanner-bookmarklet.js`
Minified bookmarklet version for quick execution.

## Features

- **Secret Detection**: Finds exposed API keys, tokens, credentials
- **XSS Analysis**: Identifies DOM XSS sinks with taint tracking
- **Endpoint Mapping**: Discovers API endpoints and sensitive routes
- **Dynamic Analysis**: Captures live network requests
- **Storage Audit**: Scans localStorage, sessionStorage, cookies
- **Deobfuscation**: Handles string-array and base64 obfuscation

## Usage

### Method 1: Browser Console
1. Open browser DevTools (F12)
2. Paste the entire `websec-scanner.js` script into the console
3. Press Enter to run

### Method 2: Bookmarklet
1. Copy the minified code from `websec-scanner-bookmarklet.js`
2. Create a new bookmark
3. Paste the code as the URL
4. Click the bookmark on any page to scan

### Method 3: Local Server
```bash
cd scripts
python3 -m http.server 3000
```
Then load via console:
```javascript
var s = document.createElement('script');
s.src = 'http://localhost:3000/websec-scanner.js';
document.body.appendChild(s);
```

## Configuration

Edit the `CFG` object at the top of the script to customize:

```javascript
var CFG = {
  INCLUDE_DEPTH    : 5,      // BFS max depth for JS files
  INCLUDE_LIMIT    : 0,      // 0 = unlimited
  BFS_BRAKE        : 2000,   // Max URLs to scan
  FETCH_CONCUR     : 6,      // Parallel requests
  FETCH_TIMEOUT_MS : 15000,  // Request timeout
  DYN_IDLE_MS      : 500,    // Network idle time
  DYN_MAX_MS       : 8000,   // Max dynamic capture time
  DYN_MIN_MS       : 1500,   // Min wait before idle check
};
```

## Output

The scanner automatically:
1. Downloads a JSON report file
2. Stores results in `window.__wsReport`
3. Prints summary to console

### Report Sections

- **secrets**: Exposed credentials and API keys
- **xssSinks**: DOM XSS vulnerabilities
- **endpoints**: Discovered API endpoints
- **sensitiveEndpoints**: High-risk endpoints
- **dynamicRequests**: Captured network traffic
- **browserStorage**: Secrets in storage
- **obfuscatedFiles**: Files that couldn't be fully deobfuscated
- **corsBlocked**: Files blocked by CORS (manual review needed)

### Risk Score

- **0-19**: LOW
- **20-39**: MEDIUM
- **40-69**: HIGH
- **70-100**: CRITICAL

## Detection Capabilities

### Secrets (40+ patterns)
- AWS keys, Google API keys, Stripe keys
- JWT tokens, bearer tokens, GitHub tokens
- Database URIs (MongoDB, PostgreSQL, MySQL)
- Firebase, Algolia, Cloudflare keys
- And many more...

### XSS Sinks
- `eval()`, `new Function()`
- `innerHTML`, `outerHTML`
- `document.write()`
- `setTimeout`/`setInterval` with strings
- And more...

### Sensitive Endpoints
- Admin panels, debug endpoints
- Auth endpoints, config files
- API documentation, health checks
- Webhooks, GraphQL, payment endpoints

## Post-Scan

Access results:
```javascript
// Full report
window.__wsReport

// Restore original fetch/XHR (undo patches)
window.__wsRestore()
```

## Limitations

- CORS blocks some external scripts (marked for manual review)
- Highly obfuscated code may have partial coverage
- Only scans client-side JavaScript
- Requires browser execution context

## Security Note

This tool is for authorized security testing and educational purposes only. Always obtain proper authorization before scanning websites you don't own.

## License

For educational and authorized security testing purposes only.
