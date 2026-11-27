# tedem.dev

The personal website of [tedem](https://tedem.dev/), built with [Laravel](https://laravel.com/).

[![PHP](https://img.shields.io/badge/PHP-8.5+-777bb4?logo=php)](https://www.php.net/)
[![Laravel](https://img.shields.io/badge/Laravel-13.x-ff2d20?logo=laravel)](https://laravel.com/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-3.x-155dfc?logo=inertia)](https://inertiajs.com/)
[![React Starter Kit](https://img.shields.io/badge/React_Starter_Kit-50a9f6c-61dafb?logo=react)](https://github.com/laravel/react-starter-kit)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-4.x-000000?logo=shadcnui)](https://ui.shadcn.com/)

## Features

- **Two languages:** Turkish at `/` and English under `/en`, with translated pages, `hreflang` links, a bilingual sitemap and error pages in the visitor's language. The copy lives in `resources/js/i18n/messages`.
- **Blog:** posts are written in Markdown in the admin area (`/admin`), each in one language, with code highlighting ([Phiki](https://github.com/phikiphp/phiki)) and short, permanent URLs (`/posts/{slug}/{id}`).
- **SEO:** canonical URLs, Open Graph and Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt` and `noindex` on everything that is not a public page.
- **Server-side rendering** with Inertia, so pages arrive as full HTML.

## Requirements

- PHP 8.5+ and Composer
- Node.js 24.11+ (or 22.18+)
- SQLite for local development (the default in `.env.example`)

## Getting started

```bash
composer setup   # install dependencies, create .env, migrate, install git hooks, build assets
composer dev     # run the app, queue, logs and Vite together
```

The site is at the URL in `APP_URL`. To write posts, register at `/admin/register`, then give the account admin rights:

```bash
php artisan admin:grant you@example.com
```

## Checks

| Command                 | What it does                          |
| ----------------------- | ------------------------------------- |
| `composer test`         | Pint, PHPStan and the Pest test suite |
| `composer types:check`  | PHPStan (level 8)                     |
| `composer rector:check` | Rector, without changing files        |
| `npm run check`         | Vite+ lint and formatting             |
| `npm run types:check`   | TypeScript                            |

Git hooks run them for you: formatting and Rector on commit, commit message rules, then static analysis and tests before every push.

## Contributing

Commit messages follow the rules in [CONTRIBUTING.md](CONTRIBUTING.md), checked by commitlint.

## Deployment

The site runs on a Debian server with nginx, PHP-FPM and MariaDB. [deploy/README.md](deploy/README.md) covers the server setup; after pushing to `main`, run this on the server:

```bash
php artisan deploy:update
```

## UI components

This project uses [shadcn/ui](https://ui.shadcn.com/). To initialize the Laravel preset, run:

```bash
npx shadcn@latest init --preset bIkeynI --base radix --template laravel
```
