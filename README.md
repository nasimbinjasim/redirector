# go-redirector

A tiny Next.js app that turns `go.yourdomain.com/<slug>` into a redirect to
any destination URL you configure — the same pattern sites use for
`go.example.com/whatsapp` style links.

## How it works
- `links.config.js` — a plain object mapping slug → destination URL.
- `app/[slug]/route.js` — catches any path and 307-redirects to the mapped URL.
- Unknown slugs fall back to the homepage.

## Local setup
```bash
npm install
npm run dev
```
Visit `http://localhost:3000/whatsapp` — it should redirect to the WhatsApp
link defined in `links.config.js`.

## Editing links
Open `links.config.js` and add/edit entries:
```js
module.exports = {
  whatsapp: "https://wa.me/8801XXXXXXXXX?text=Hello",
  telegram: "https://t.me/yourusername",
};
```
No restart needed in dev (hot reload); redeploy needed in production.

## Deploying (free options)

### Vercel (easiest, built by the Next.js team)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Deploy (no config needed, Vercel auto-detects Next.js).
4. In Vercel → Project → Settings → Domains, add `go.yourdomain.com` and
   follow the DNS instructions (usually a CNAME record).

### Self-hosted (VPS)
```bash
npm install
npm run build
npm run start   # runs on port 3000 by default
```
Put this behind Nginx/Caddy with a reverse proxy on your domain, or use
`pm2` to keep it running.

## Getting your WhatsApp link
Format: `https://wa.me/<countrycode><number>` (no + or spaces), e.g.
`https://wa.me/8801712345678`. Add `?text=your%20prefilled%20message` to
prefill a message, URL-encoded.

## Notes
- Redirects are server-side (HTTP 307), so they work instantly with no
  client-side JS flash, and are fast to crawl/share.
- Extend `links.config.js` freely, or swap it for reading from a database/
  KV store (e.g. Vercel KV, Supabase) if you want to manage links without
  redeploying.
