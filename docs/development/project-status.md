# Snow-Sports-Gear-Store 專案狀態文檔

## 專案概述

Repository: [Snow-Sports-Gear-Store](https://github.com/richiea1y/Snow-Sports-Gear-Store)"
滑雪用品電商網站前後台系統，基於 Vue 3 + Node.js 技術棧，使用 Docker 容器化部署。

## 當前進度

1. 已完成基礎開發環境設置
2. 已完成 Docker 容器化配置（前端 + MySQL）
3. 已完成基本的 Vue 3 + Vite 設置

## 技術堆疊

### 前端

- Vue 3
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- SCSS
- Element Plus
- Vitest
- Playwright

### 後端

- Node.js
- MySQL

### 開發環境

- Docker
- Docker Compose

## 目錄結構

```bash
Snow-Sports-Gear-Store/
├── frontend/          # Vue 3 前端專案
├── backend/           # Node.js 後端專案（待開發）
├── nginx/             # Nginx 配置（待開發）
├── docker/
│   ├── frontend/
│   │   └── Dockerfile
│   ├── backend/
│   │   └── Dockerfile
│   └── nginx/
│       └── Dockerfile
├── docs/             # 項目文檔
│   └── development/
│       ├── docker-guide.md
│       └── project-status.md
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## 核心配置文件

### 1. package.json

```json
{
  "dependencies": {
    "await-to-js": "^3.0.0",
    "axios": "^1.7.7",
    "crypto-js": "^4.2.0",
    "dayjs": "^1.11.13",
    "element-plus": "^2.8.4",
    "pinia": "^2.2.6",
    "postcss-import": "^16.1.0",
    "postcss-nesting": "^13.0.1",
    "unplugin-auto-import": "^0.18.3",
    "vue": "^3.5.12",
    "vue-router": "^4.4.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.14.0",
    "@playwright/test": "^1.48.2",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vitest/eslint-plugin": "1.1.7",
    "@vue/eslint-config-prettier": "^10.1.0",
    "@vue/test-utils": "^2.4.6",
    "eslint": "^8.57.0",
    "eslint-plugin-vue": "^9.23.0",
    "prettier": "^3.3.3",
    "sass": "^1.81.0",
    "tailwindcss": "^3.4.15",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

### 2. vite.config.js

```javascript
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
  };
});
```

### 3. docker-compose.yml

```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: docker/frontend/Dockerfile
    ports:
      - '3000:3000'
    volumes:
      - ./frontend:/app/frontend
    command: npm run dev -- --host

  db:
    image: mysql:8.0
    ports:
      - '3306:3306'
    environment:
      - MYSQL_DATABASE=snow_sports
    volumes:
      - mysql_data:/var/lib/mysql
```

### 4. VS Code 設置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore"
}
```

### 5. eslint.config.js

```javascript
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
];
```

## 下一步開發計劃

1. 建立合理的前端目錄結構

- 設置標準的 Vue 3 專案結構
- 組織資源和組件目錄

2. 設置前後台分離的路由配置

- 配置前台用戶路由
- 配置後台管理路由
- 實現路由權限控制

3. 配置狀態管理

- 用戶狀態管理
- 購物車狀態管理
- 全局 UI 狀態管理

4. 設置基礎樣式架構

- 整合 Tailwind CSS 和 SCSS
- 建立主題系統
- 組織全局樣式結構

5. 配置 API 請求

- 封装 Axios
- 統一錯誤處理
- 請求/響應攔截器
- API 模塊化管理

## 注意事項

- 確保 Docker 環境正確配置
- 遵循 Vue 3 最佳實踐
- 保持文檔及時更新
