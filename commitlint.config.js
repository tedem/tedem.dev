// Commit message rules. CONTRIBUTING.md explains each type and scope.

const SCOPES = ['site', 'admin', 'auth', 'content', 'seo', 'security', 'ui', 'deps', 'tooling', 'config'];

// Articles add length, not meaning: "fix: show toasts", not "fix: show the toasts".
// Text in backticks is code and is not checked.
const ARTICLE = /\b(a|an|the)\b/i;

export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-no-articles': ({ subject }) => {
          const prose = (subject ?? '').replace(/`[^`]*`/g, '');

          return [!ARTICLE.test(prose), 'subject must not contain articles (a, an, the)'];
        },
      },
    },
  ],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'perf', 'docs', 'test', 'style', 'build', 'ci', 'chore']],
    'scope-enum': [2, 'always', SCOPES],
    'header-max-length': [2, 'always', 50],
    'subject-no-articles': [2, 'always'],
  },
};
