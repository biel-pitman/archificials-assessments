/**
 * Report Gateway Worker
 * Serves password-protected AI readiness reports from Cloudflare R2
 * 
 * Routes:
 * - GET /r/:slug → password form or report (if authenticated)
 * - POST /r/:slug/auth → validate password, set auth cookie
 * - GET /r/:slug/pdf → serve with ?print-pdf for PDF export
 * - GET /health → health check
 */

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // Health check endpoint
        if (url.pathname === '/health') {
            return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Route: GET /r/:slug
        if (url.pathname.match(/^\/r\/[a-z0-9-]+\/?$/) && request.method === 'GET') {
            return handleGetReport(request, url, env);
        }
        
        // Route: POST /r/:slug/auth
        if (url.pathname.match(/^\/r\/[a-z0-9-]+\/auth\/?$/) && request.method === 'POST') {
            return handleAuthPost(request, url, env);
        }
        
        // Route: GET /r/:slug/pdf
        if (url.pathname.match(/^\/r\/[a-z0-9-]+\/pdf\/?$/) && request.method === 'GET') {
            return handleGetReportPDF(request, url, env);
        }
        
        // 404
        return new Response('Not Found', { status: 404 });
    }
};

/**
 * Handle GET /r/:slug
 * Check authentication, serve report or password form
 */
async function handleGetReport(request, url, env) {
    const slug = url.pathname.split('/')[2];
    
    // Check auth cookie
    const cookies = parseCookies(request.headers.get('cookie') || '');
    const authCookie = cookies[`report_auth_${slug}`];
    
    if (authCookie === 'valid') {
        // Authenticated - serve report
        return serveReportHTML(slug, env);
    }
    
    // Not authenticated - show password form
    return showPasswordForm(slug);
}

/**
 * Handle POST /r/:slug/auth
 * Validate submitted password against stored hash
 */
async function handleAuthPost(request, url, env) {
    const slug = url.pathname.split('/')[2];
    
    try {
        const body = await request.text();
        const params = new URLSearchParams(body);
        const submittedPassword = params.get('password');
        
        if (!submittedPassword) {
            return new Response('Password required', { status: 400 });
        }
        
        // Fetch report metadata from R2 to get password hash and client name
        const reportKey = `reports/${slug}/index.html`;
        const reportObj = await env.REPORTS_BUCKET.head(reportKey);
        
        if (!reportObj) {
            return showPasswordForm(slug, 'Report not found');
        }
        
        const storedHash = reportObj.customMetadata?.passwordHash;
        const clientName = reportObj.customMetadata?.clientName || 'Client';
        
        if (!storedHash) {
            return showPasswordForm(slug, 'Report configuration error');
        }
        
        // Hash submitted password with SHA-256
        const submittedHash = await hashPassword(submittedPassword);
        
        if (submittedHash === storedHash) {
            // Correct password - set auth cookie and redirect
            const setCookieHeader = `report_auth_${slug}=valid; Max-Age=86400; HttpOnly; Secure; SameSite=Strict; Path=/r/${slug}`;
            
            return new Response(null, {
                status: 303,
                headers: {
                    'Set-Cookie': setCookieHeader,
                    'Location': `/r/${slug}`
                }
            });
        } else {
            // Wrong password
            return showPasswordForm(slug, 'Incorrect password. Please try again.');
        }
    } catch (error) {
        console.error('Auth error:', error);
        return new Response('Authentication error', { status: 500 });
    }
}

/**
 * Handle GET /r/:slug/pdf
 * Serve same HTML with print-pdf query param for browser PDF export
 */
async function handleGetReportPDF(request, url, env) {
    const slug = url.pathname.split('/')[2];
    
    // Check auth cookie
    const cookies = parseCookies(request.headers.get('cookie') || '');
    const authCookie = cookies[`report_auth_${slug}`];
    
    if (authCookie !== 'valid') {
        return new Response('Unauthorized', { status: 401 });
    }
    
    // Serve report with ?print-pdf for reveal.js PDF export
    const reportKey = `reports/${slug}/index.html`;
    const report = await env.REPORTS_BUCKET.get(reportKey);
    
    if (!report) {
        return new Response('Report not found', { status: 404 });
    }
    
    const html = await report.text();
    // Inject print-pdf mode
    const modifiedHtml = html.replace(
        '</head>',
        '<script>window.location.search += (window.location.search ? "&" : "?") + "print-pdf";</script></head>'
    );
    
    return new Response(modifiedHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}

/**
 * Serve report HTML from R2
 */
async function serveReportHTML(slug, env) {
    try {
        const reportKey = `reports/${slug}/index.html`;
        const report = await env.REPORTS_BUCKET.get(reportKey);
        
        if (!report) {
            return new Response('Report not found', { status: 404 });
        }
        
        const html = await report.text();
        
        return new Response(html, {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'private, max-age=3600',
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'SAMEORIGIN'
            }
        });
    } catch (error) {
        console.error('Error serving report:', error);
        return new Response('Error loading report', { status: 500 });
    }
}

/**
 * Show password entry form
 */
function showPasswordForm(slug, errorMsg = '') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Access — Archificials</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1f 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            color: #1a1a2e;
        }
        
        .container {
            background: white;
            padding: 60px 40px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }
        
        .logo {
            text-align: center;
            font-size: 14px;
            font-weight: 700;
            color: #e27308;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 30px;
        }
        
        h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #1a1a2e;
        }
        
        .subtitle {
            font-size: 16px;
            color: #6c757d;
            margin-bottom: 30px;
            line-height: 1.5;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 14px;
            color: #1a1a2e;
        }
        
        input[type="password"] {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 16px;
            font-family: inherit;
            transition: border-color 0.3s ease;
        }
        
        input[type="password"]:focus {
            outline: none;
            border-color: #e27308;
            box-shadow: 0 0 0 3px rgba(226, 115, 8, 0.1);
        }
        
        button {
            width: 100%;
            padding: 12px;
            background: #e27308;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s ease;
            font-family: inherit;
        }
        
        button:hover {
            background: #c96407;
        }
        
        button:active {
            transform: scale(0.98);
        }
        
        .error {
            background: #ffe5e5;
            border: 1px solid #ff9999;
            color: #c00;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #6c757d;
        }
        
        .footer a {
            color: #e27308;
            text-decoration: none;
        }
        
        @media (max-width: 480px) {
            .container {
                padding: 40px 20px;
            }
            
            h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">ARCHIFICIALS</div>
        <h1>Access Report</h1>
        <p class="subtitle">Enter the password provided in your email to view your AI readiness assessment report.</p>
        
        ${errorMsg ? `<div class="error">${escapeHtml(errorMsg)}</div>` : ''}
        
        <form method="POST" action="/r/${slug}/auth">
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    autofocus
                />
            </div>
            <button type="submit">Access Report</button>
        </form>
        
        <div class="footer">
            <p>Need help? <a href="mailto:hello@archificials.com">Contact us</a></p>
        </div>
    </div>
</body>
</html>
    `;
    
    return new Response(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
    });
}

/**
 * Parse cookies from header
 */
function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    
    cookieHeader.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
            cookies[name] = decodeURIComponent(value);
        }
    });
    
    return cookies;
}

/**
 * Hash password with SHA-256
 */
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
