// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'import/extensions': ['error', 'always', {
      'js': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "arrow-parens": ["error", "as-needed"],
    "no-underscore-dangle": "off",
    //"no-underscore-dangle": ["error", { "allow": ["foo_", "_bar"] }]
  },
  "globals": {
    "window": true,
    "document": true,
    "setTimeout": true,
    "setInterval": true,
    "VERSION": true,
    "items": true,
    "BlobBuilder":true,
    "WebKitBlobBuilder":true,
    "MozBlobBuilder": true,
    "__MILKYWAY_DEVTOOLS_GLOBAL_HOOK__": true,
    "__REDUX_DEVTOOLS_EXTENSION__": true
  }
}
