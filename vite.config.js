import topLevelAwait from 'vite-plugin-top-level-await';
import legacy from '@vitejs/plugin-legacy';

export default {
  plugins: [
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      // to use Array.at
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
      // https://github.com/zloirock/core-js#relative-indexing-method
      modernPolyfills: ['proposals/relative-indexing-method'],
    }),
  ],
  // to build with top level await, without using the plugin vite-plugin-top-level-await
  // esbuild: {
  //   supported: {
  //     'top-level-await': true, //browsers can handle top-level-await features
  //   },
  // },
};
