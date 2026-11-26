# Contributing

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). `commitlint.config.js` enforces the rules below on every commit.

```text
type(scope): subject
```

- **One line.** The header is the whole message; at most 50 characters.
- **Subject:** imperative mood ("add", not "added"), lowercase, no trailing period.
- **No articles:** leave out _a_, _an_ and _the_ ("fix: show toasts in admin area").
- **Code in backticks:** file names, functions, classes and commands (``feat: serve `robots.txt` per environment``).
- **Scope is optional:** use one when the change belongs to a single area; leave it out when it spans several.
- **Breaking changes:** add `!` after the type or scope (`feat(admin)!: ...`).

### Types

| Type       | Use for                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `feat`     | New or changed behaviour people can see, including changed URLs         |
| `fix`      | Bug fixes                                                               |
| `refactor` | Code changes that keep behaviour the same (moves, renames, cleanups)    |
| `perf`     | Faster or lighter, same behaviour                                       |
| `style`    | Formatting only                                                         |
| `test`     | Tests only                                                              |
| `docs`     | Documentation only                                                      |
| `build`    | Dependencies, the bundler and the build                                 |
| `ci`       | CI and deploy workflows                                                 |
| `chore`    | Tooling configuration (linters, formatters, static analysis, git hooks) |

### Scopes

| Scope      | Area                                                         |
| ---------- | ------------------------------------------------------------ |
| `site`     | Public site: pages, layout, home page sections, error pages  |
| `admin`    | Admin dashboard and settings                                 |
| `auth`     | Login, registration, password reset, two-factor, passkeys    |
| `content`  | Copy and profile data in `resources/js/content`              |
| `seo`      | Meta tags, structured data, sitemap, `robots.txt`, `noindex` |
| `security` | Security headers and hardening                               |
| `ui`       | Shared and shadcn components, theme, global styles           |
| `deps`     | Composer and npm dependencies                                |
| `tooling`  | Linters, formatters, static analysis, git hooks              |
| `config`   | App and environment configuration                            |

A new scope is added to `SCOPES` in `commitlint.config.js` and to this table in the same commit.

### Examples

```text
feat(site): add contact page
fix(admin): show flash toasts
refactor(site): rename public site from main to site
feat(seo): add XML sitemap
feat(security): add security headers
build(deps): update npm dependencies
chore(tooling): enable more Rector rules
refactor: group admin and auth files by area
```
