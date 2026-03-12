# Report Gateway Worker & R2 Deployment Guide

## Prerequisites

1. **Wrangler CLI installed**: [Install from npm](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
   ```bash
   npm install -g wrangler@latest
   ```

2. **Cloudflare account access** with:
   - API Token (created in Account Settings → API Tokens)
   - Account ID (visible in account settings)
   - Existing Cloudflare workers project (you have one)

3. **Set auth environment variable**:
   ```bash
   export CLOUDFLARE_API_TOKEN="your-api-token-here"
   ```

## Step 1: Create R2 Bucket

```bash
# Navigate to repo root
cd c:\Users\aponw\OneDrive\Documentos\Claude\ Workspace\projects\client-b\archificials-assessments

# Create the bucket
wrangler r2 bucket create archificials-reports

# Verify bucket was created
wrangler r2 bucket list
```

**Expected output**: `archificials-reports` appears in list

## Step 2: Configure Worker

Edit `workers/report-gateway/wrangler.toml` and add your Cloudflare details:

```toml
account_id = "YOUR_ACCOUNT_ID"  # Get from https://dash.cloudflare.com
```

## Step 3: Deploy Worker

```bash
cd workers/report-gateway
wrangler deploy

# Expected output:
# ✓ Uploaded report-gateway (X.XX KiB)
# ✓ Published to https://report-gateway.<account>.workers.dev
```

**Save the deployed URL** — this is where your reports will be served.

## Step 4: Upload Test Report

Generate SHA-256 hash for test password `"test-password123"`:

```bash
# macOS/Linux:
echo -n "test-password123" | sha256sum

# Windows PowerShell:
$str = "test-password123"
$bytes = [System.Text.Encoding]::UTF8.GetBytes($str)
$hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
[Convert]::ToHexString($hash).ToLower()
```

**Expected hash**: `d4c94c5e9e7f7f7f... (64 characters)`

Upload test report to R2:

```bash
# From repo root
wrangler r2 object put archificials-reports/reports/test-demo/index.html \
  --file reports/test-report.html \
  --content-type text/html \
  --metadata "clientName=Test Demo,passwordHash=<YOUR_HASH_HERE>"

# Example:
wrangler r2 object put archificials-reports/reports/test-demo/index.html \
  --file reports/test-report.html \
  --content-type text/html \
  --metadata "clientName=Test Demo,passwordHash=d4c94c5e9e7f7f7f..."
```

## Step 5: Test Gateway

1. **Visit the report URL**:
   ```
   https://report-gateway.<account>.workers.dev/r/test-demo
   ```

2. **You should see**:
   - Archificials-branded password form
   - Title: "Access Report"
   - Password input field

3. **Enter password**: `test-password123`

4. **Verify**:
   - Form submits to `/r/test-demo/auth`
   - You're redirected back to `/r/test-demo`
   - Report renders (title slide, 4 content slides)
   - reveal.js navigation works (arrow keys, spacebar)

5. **Test PDF export**:
   - Append `?print-pdf` to report URL
   - Browser opens print dialog
   - Print → Save as PDF (should work correctly)

## Step 6: Set Custom Domain (Optional)

To serve reports from `reports.archificials.com`:

1. Go to Cloudflare Dashboard → Workers & Pages → report-gateway
2. Click "Triggers" → "Custom Domains"
3. Add domain: `reports.archificials.com`
4. Approve DNS verification

After this, reports will be at: `https://reports.archificials.com/r/{slug}`

## Troubleshooting

### "Bucket not found" error
- Verify bucket exists: `wrangler r2 bucket list`
- Confirm name is `archificials-reports` (exact match)
- Check account_id in wrangler.toml is correct

### "Unauthorized" on password POST
- Verify password hash is correct (64 hex characters)
- Check metadata was saved: `wrangler r2 object info archificials-reports/reports/test-demo/index.html`

### Password form shows but doesn't submit
- Check browser console for errors
- Verify worker is deployed: `wrangler deploy --dry-run`
- Test with curl:
  ```bash
  curl -X POST https://report-gateway.<account>.workers.dev/r/test-demo/auth \
    -d "password=test-password123" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -v
  ```

### Report doesn't render
- Check reveal.js CDN is accessible
- Verify Plotly.js loaded: browser DevTools → Network tab
- Check R2 object has correct content-type: `text/html`

## Session 2 Integration

When Session 2's Report Orchestrator Worker generates new reports, it will:

1. Generate a unique slug (e.g., `mit-2026-03`)
2. Create password (e.g., `Gx2kP9mQ`)
3. Hash password with SHA-256
4. Assemble full HTML using template + research data
5. Upload to `archificials-reports/reports/{slug}/index.html` with metadata:
   ```
   clientName: {client_name}
   passwordHash: {sha256_hash}
   ```
6. Gateway serves at `https://reports.archificials.com/r/{slug}`

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `wrangler r2 bucket create archificials-reports` | Create bucket |
| `wrangler r2 bucket list` | List buckets |
| `wrangler r2 object put ...` | Upload file |
| `wrangler r2 object info ...` | Check metadata |
| `wrangler r2 object delete ...` | Delete file |
| `wrangler deploy` | Deploy/update worker |
| `wrangler logs` | View worker logs |
| `wrangler tail` | Stream live logs |
