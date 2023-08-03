// the best tsup config ever for browser compatability
import type { Options } from 'tsup';

const config: Options = {
    entryPoints: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    splitting: true,
    clean: true,
    minify: true,
    legacyOutput: false,
    target: 'es2018',
    tsconfig: 'tsconfig.json',
    external: []
};

export default config;
