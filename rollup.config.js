import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
import typescript from 'rollup-plugin-typescript2';
const isProd = process.env.NODE_ENV === 'production';
const buildForEsModule = process.env.MODULE === 'ES';

let config = {
  input: './src/index.ts',
  output: {
    file: isProd ? 'libs/app.min.js' : 'libs/app.js',
    format: buildForEsModule ? 'esm' : 'iife', //amd, cjs, esm, iife, umd  iife is for browsers
    name: 'app',
    sourcemap: !isProd,
    exports: 'named',
  },
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      extensions: ['.js', '.ts'],
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    replace({
      'IS_PRODUCTION': isProd
    }),
    // eslint({
    //   include: ['src/**/*.js'],
    //   exclude: 'node_modules/**',
    // }),
    babel({
      include: 'src/**',
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    typescript({ verbosity: 0, clean: true })
  ],
};

if (!isProd) {
  config.plugins.push(
    serve({
      contentBase: './',
      historyApiFallback: true,
      host: 'localhost',
      port: 10002,
    })
  );
} else {
  // /config.plugins.push(uglify());
}

export default config;
