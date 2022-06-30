import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import regenerator from 'rollup-plugin-regenerator';


const { BUILD_TYPE, NODE_ENV } = process.env;

const config = {
  input: 'src/index.ts',
  plugins: [],
  output: {
    globals: {
      'axios': 'axios'
    }
  },
  external: ['axios'],
};

const babelConfig = {
  plugins: ['external-helpers'],
  exclude: 'node_modules/**',
};

if (BUILD_TYPE === 'cjs') {
  config.output = { ...config.output, format: 'cjs' };
  config.plugins.push(nodeResolve(), babel(babelConfig));
}

if (BUILD_TYPE === 'umd') {
  config.output = { ...config.output, format: 'umd', name: 'SSC' };
  config.plugins.push(babel(babelConfig));
}

config.plugins.push(regenerator());

if (NODE_ENV === 'production') {
  config.plugins.push(uglify());
}


export default config;