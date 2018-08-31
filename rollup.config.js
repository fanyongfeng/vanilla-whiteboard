import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
const isProd = process.env.NODE_ENV === 'production';

let config = {
  input: './src/index.js',
  output: {
    file: isProd ? 'dist/app.min.js' : 'dist/app.js',
    format: 'iife',
    name: 'app',
    sourcemap: !isProd,
    exports: 'named',
  },
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      extensions: ['.js'],
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), //production | development
    }),
    eslint({
      include: ['src/**/*.js'],
      exclude: 'node_modules/**',
    }),
    babel({
      include: 'src/**',
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
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
  config.plugins.push(uglify());
}

export default config;
