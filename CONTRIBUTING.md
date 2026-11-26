# Contributing

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). `commitlint.config.js` enforces the rules below on every commit.

```text
type: subject
```

- **One line.** The header is the whole message; at most 50 characters.
- **Subject:** imperative mood ("add", not "added"), lowercase, no trailing period.
- **No articles:** leave out _a_, _an_ and _the_ ("fix: show toasts in admin area").
- **Code in backticks:** file names, functions, classes and commands (``feat: serve `robots.txt` per environment``).
- **No scope:** `feat: …`, never `feat(admin): …`; the type and subject say enough for a project this size.
- **Breaking changes:** add `!` after the type (`feat!: ...`).

### Types

| Type       | Use for                                                                |
| ---------- | ---------------------------------------------------------------------- |
| `feat`     | New or changed behaviour people can see, including changed URLs        |
| `fix`      | Bug fixes                                                              |
| `refactor` | Code changes that keep behaviour the same (moves, renames, cleanups)   |
| `perf`     | Faster or lighter, same behaviour                                      |
| `style`    | Formatting only                                                        |
| `test`     | Tests only                                                             |
| `docs`     | Documentation only                                                     |
| `build`    | Dependencies, the bundler and the build                                |
| `ci`       | CI and deploy workflows                                                |
| `chore`    | Tooling and app configuration (linters, formatters, git hooks, `.env`) |

### Examples

```text
feat: add contact page
fix: show flash toasts in admin area
feat: move login under /admin
feat: add XML sitemap
feat: add security headers
build: update npm dependencies
chore: enable more Rector rules
refactor: group admin and auth files by area
```
