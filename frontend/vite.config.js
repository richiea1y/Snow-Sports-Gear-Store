import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import type { OutputBundle } from 'rollup';

// 創建一個插件來控制 CSS 順序
function styleOrderPlugin() {
  const styleOrder = [];

  return {
    name: 'style-order',
    enforce: 'post',
    apply: 'build',

    renderChunk(_, chunk) {
      if (chunk.viteMetadata?.importedCss) {
        chunk.viteMetadata.importedCss.forEach(css => {
          if (!styleOrder.includes(css)) {
            if (css.includes('element-plus')) {
              styleOrder.push(css);
            } else {
              styleOrder.unshift(css);
            }
          }
        });
      }
      return null;
    },

    transformIndexHtml(html) {
      const cssLinks = html.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || [];

      const sortedLinks = cssLinks.sort((a, b) => {
        const aIndex = styleOrder.findIndex(s => a.includes(s));
        const bIndex = styleOrder.findIndex(s => b.includes(s));
        return aIndex - bIndex;
      });

      // 移除原有的 CSS 連結
      const newHtml = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, '');

      // 修改插入方式，確保正確的換行和縮排
      return newHtml.replace(
        /(<link[^>]*modulepreload[^>]*>)\s*(?=<\/head>)/,
        `$1\n    ${sortedLinks.join('\n    ')}\n  `
      );
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: process.env.NODE_ENV === 'production' ? '/frontend/' : './',
    plugins: [
      vue(),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'icon', // 自定義icon前綴
            enabledCollections: ['ep'], // 使用 Element Plus icon set
          }),
        ],
      }),
      styleOrderPlugin(),
      createSvgIconsPlugin({
        // 指定需要緩存的圖標文件夾
        iconDirs: [fileURLToPath(new URL('./src/assets/img/icons', import.meta.url))],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
      Icons({
        autoInstall: true, // 如果未安裝會自動安裝icon library
      }),
      // vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
        '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        '@/assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@/composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
        '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@/plugin': fileURLToPath(new URL('./src/plugin', import.meta.url)),
      }
    },
    server: {
      host: '0.0.0.0',  // 允許外部訪問
      port: 3000,
      strictPort: true, // 如果端口被占用，不要嘗試其他端口
      proxy: {
        '/api': {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.toString().split('node_modules/')[1].split('/')[0].includes('element-plus')) {
                return 'element-plus';
              } else {
                return 'vendor';
              }
            }
          },
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
          assetFileNames: (assetInfo) => {
            const asset = assetInfo;
            const info = asset.name.split('.');
            const extType = info[info.length - 1];
            if (/png|jpe?g|gif|svg|webp|ico/i.test(extType)) {
              return `img/[name]-[hash][extname]`;
            }
            if (/css/i.test(extType)) {
              return `css/[name]-[hash][extname]`;
            }
            if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              return `fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        }
      },
      minify: 'esbuild',  // 使用 esbuild 壓縮
    },
    esbuild: {
      //drop: ['console', 'debugger'],  // 移除 console 和 debugger
    },
    css: {
      devSourcemap: true,
    }
  };


});

