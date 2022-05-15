// eslint-disable-next-line spaced-comment
/// <reference types="vitest" />

import type {UserConfigExport} from 'vite';
import type {InlineConfig} from 'vitest';
import {defineConfig} from 'vite';
import path from 'path';

const {resolve} = path;

const config: UserConfigExport & InlineConfig = defineConfig({
  build: {
    lib: {
      entry: resolve('src/main.ts'),
      name: 'CanvasHelper',
    },
  },

  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
});

export default config;
