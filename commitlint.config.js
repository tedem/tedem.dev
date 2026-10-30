export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'perf', 'docs', 'test', 'style', 'build', 'ci', 'chore']],
    'header-max-length': [2, 'always', 50],
  },
};
