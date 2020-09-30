module.exports = api => {
  api.cache(true)

  const presets = [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    '@babel/react',
  ]

  const plugins = [
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
    'react-hot-loader/babel',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal',
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    'macros',
  ]

  return {
    presets,
    plugins,
  }
}
