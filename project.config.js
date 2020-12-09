const path = require('path');
const { default: create } = require('@riseup/library');

module.exports = create({
  // Whether it is a monorepo child project
  monorepo: false,
  // Enables typescript and declaration files
  typescript: true,
  // Paths used on build
  paths: {
    root: __dirname,
    docs: path.join(__dirname, 'docs'),
    build: path.join(__dirname, 'pkg')
  },
  version: {
    // Build project on version bump. Boolean.
    build: true,
    // Generate docs from TS on version bump. Boolean.
    docs: true
  },
  assign: {
    todo: ['xxx', 'fixme', 'todo', 'refactor'],
    // Source code aliases
    alias: {
      '~': './src'
    }
  },
  extend: {
    babel: {
      strategy: 'deep',
      configure: {}
    },
    eslint: {
      strategy: 'deep',
      configure: {
        overrides: [
          {
            files: ['*'],
            rules: {
              'no-redeclare': 0,
              'import/export': 0,
              '@typescript-eslint/no-namespace': 0
            }
          }
        ]
      }
    },
    jest: {
      strategy: 'deep',
      configure: {
        modulePathIgnorePatterns: [],
        transformIgnorePatterns: ['/node_modules/(?!(module-to-transpile)/)']
      }
    },
    typedoc: {
      strategy: 'deep',
      configure: {
        exclude: [
          '**/__mocks__/**/*',
          '**/ensure/trunk.ts',
          '**/ensure/stringify.ts'
        ]
      }
    }
  }
});
