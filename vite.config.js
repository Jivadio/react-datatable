var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import tsConfigPaths from 'vite-tsconfig-paths';
import * as packageJson from './package.json';
// https://vitejs.dev/config/
export default defineConfig(function (configEnv) { return ({
    plugins: [
        react(),
        tsConfigPaths(),
        linterPlugin({
            include: ['./src/**/*.{ts,tsx}'],
            linters: [new EsLinter({ configEnv: configEnv })],
        }),
        dts({
            include: ['src/component/'],
        }),
    ],
    build: {
        lib: {
            entry: resolve('src', 'components/index.ts'),
            name: 'ReactDataTableComponent',
            formats: ['es', 'umd'],
            fileName: function (format) { return "react-datatable-component.".concat(format, ".js"); },
        },
        rollupOptions: {
            external: __spreadArray([], Object.keys(packageJson.peerDependencies), true),
        },
    },
}); });
