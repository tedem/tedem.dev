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

| Type       | Use for                                                                   |
| ---------- | ------------------------------------------------------------------------- |
| `feat`     | New functionality                                                         |
| `fix`      | Bug fixes                                                                 |
| `refactor` | Code restructuring without behaviour changes                              |
| `perf`     | Performance improvements                                                  |
| `docs`     | Documentation                                                             |
| `test`     | Tests                                                                     |
| `style`    | Formatting and style without logic changes                                |
| `build`    | Build system, compiler, bundler, asset pipeline and external dependencies |
| `ci`       | CI/CD configuration and scripts (deploy commands, server configs)         |
| `chore`    | General project maintenance, tooling and configuration                    |

### Examples

```text
feat: add contact page
fix: show flash toasts in admin area
feat: move login under /admin
feat: add XML sitemap
feat: add security headers
build: update npm dependencies
chore: enable more Rector rules
ci: add server deploy commands
refactor: group admin and auth files by area
```
