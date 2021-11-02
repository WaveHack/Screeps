'use strict';

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';

const cfg = require('./screeps.json');

export default {
    input: 'src/Main.ts',

    output: {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: true,
    },

    plugins: [
        clear({targets: ['dist']}),
        resolve({rootDir: 'src'}),
        commonjs(),
        typescript({tsconfig: './tsconfig.json'}),
        screeps({config: cfg, dryRun: false}),
    ],

}
