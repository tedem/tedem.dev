{{--
  Shown while deploy:update runs (`php artisan down --render=maintenance`). Laravel renders
  it once when the site goes down and serves the stored HTML, so it must not depend on the
  built assets, the database or the session: everything is inline. Both languages, since
  the request's language is unknown here.
--}}
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>{{ config('app.name') }}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <style>
      :root { color-scheme: light dark; --bg: oklch(1 0 0); --fg: oklch(0.145 0 0); --muted: oklch(0.556 0 0); }
      @media (prefers-color-scheme: dark) { :root { --bg: oklch(0.145 0 0); --fg: oklch(0.985 0 0); --muted: oklch(0.708 0 0); } }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 2rem; background: var(--bg); color: var(--fg); font-family: ui-sans-serif, system-ui, sans-serif; }
      main { max-width: 36rem; }
      .shell { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .8125rem; color: var(--muted); }
      h1 { margin: 1.5rem 0 .75rem; font-size: clamp(2rem, 6vw, 3rem); font-weight: 500; letter-spacing: -.05em; line-height: 1.05; }
      p { margin: 0; line-height: 1.75; color: var(--muted); }
      .en { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid color-mix(in oklch, var(--muted) 30%, transparent); }
      .en h2 { margin: 0 0 .5rem; font-size: 1.25rem; font-weight: 500; color: var(--fg); }
      @media (prefers-reduced-motion: no-preference) { .cursor { animation: blink 1s steps(1) infinite; } }
      @keyframes blink { 50% { opacity: 0; } }
    </style>
  </head>
  <body>
    <main>
      <p class="shell" aria-hidden="true">$ php artisan deploy:update <span class="cursor">▍</span></p>

      <h1>Birazdan buradayım.</h1>
      <p>Site güncelleniyor; bir dakika içinde geri döner. Sayfa kendini yenileyecek.</p>

      <div class="en" lang="en">
        <h2>Back in a moment.</h2>
        <p>The site is being updated and will be back within a minute. This page reloads on its own.</p>
      </div>
    </main>
  </body>
</html>
