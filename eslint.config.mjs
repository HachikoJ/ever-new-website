import nextConfig from 'eslint-config-next'
import typescriptConfig from 'eslint-config-next/typescript'

export default [
  ...nextConfig,
  ...typescriptConfig,
  {
    ignores: ['.next/**', 'out/**', 'next-env.d.ts']
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react/no-unescaped-entities': 'off'
    }
  }
]
