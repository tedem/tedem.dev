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
      'tailwind.config.js',
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
    ignorePatterns: ['.github/**', 'composer.json', 'resources/js/components/ui/*', 'resources/views/mail/*'],
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
        files: ['**/composer.json', '**/pint.json'],
        options: {
          tabWidth: 4,
        },
      },
      {
        files: ['**/phpunit.xml', '**/phpunit.xml.dist'],
        options: {
          tabWidth: 4,
        },
      },
    ],
  },
});
