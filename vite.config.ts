import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
  plugins: lazyPlugins(() => [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true,
    }),
    inertia(),
    react({ compiler: true }),
    tailwindcss(),
    wayfinder({
      formVariants: true,
    }),
  ]),
  server: {
    watch: {
      ignored: ['**/.agents/**', '**/.claude/**', '**/.cursor/**', '**/.junie/**', '**/vendor/**'],
    },
  },
  lint: {
    ignorePatterns: [
      'vendor/**',
      'node_modules/**',
      'public/**',
      'bootstrap/ssr/**',
      'resources/js/actions/**',
      'resources/js/components/ui/*',
      'resources/js/routes/**',
      'resources/js/wayfinder/**',
    ],
    options: {
      denyWarnings: true,
      typeAware: true,
    },
  },
  fmt: {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'always',
    singleAttributePerLine: false,
    htmlWhitespaceSensitivity: 'css',
    embeddedLanguageFormatting: 'auto',
    printWidth: 120,
    tabWidth: 2,
    endOfLine: 'lf',
    ignorePatterns: ['composer.json', 'resources/js/components/ui/*'],
    sortTailwindcss: {
      functions: ['clsx', 'cn', 'cva'],
      entryPoint: 'resources/css/app.css',
    },
    overrides: [
      {
        files: ['**/*.md'],
        options: {
          proseWrap: 'preserve',
        },
      },
      {
        // PHP tooling files use 4 spaces, like the PHP code (see .editorconfig).
        files: ['**/pint.json'],
        options: {
          tabWidth: 4,
        },
      },
    ],
  },
});
