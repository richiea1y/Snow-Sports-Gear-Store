# Docker 開發環境指南

## 環境要求

- Docker Desktop
- Node.js 20 LTS
- npm 9.x 或更高版本

## 初始設置

### 1.環境準備

```bash
# 確保 Docker Desktop 已經安裝並運行
docker --version
docker-compose --version
```

### 2.專案設置

```bash
# 克隆專案（如果還沒有的話）
git clone https://github.com/your-username/Snow-Sports-Gear-Store.git
cd Snow-Sports-Gear-Store

# 創建必要的目錄結構
mkdir -p docker/frontend

# 複製環境變數檔案
cp .env.example .env
```

### 3. 配置環境變數

編輯 .env 文件，設置必要的環境變數：

```bash
# Node
NODE_VERSION=20

# MySQL
MYSQL_ROOT_PASSWORD=your_root_password    # 修改為您的根密碼
MYSQL_DATABASE=snow_sports
MYSQL_USER=snow_sports_user
MYSQL_PASSWORD=your_password              # 修改為您的用戶密碼

# Vite
VITE_HOST=0.0.0.0
```

### 4. 安裝依賴

```bash
# 進入前端目錄
cd frontend

# 安裝依賴
npm install
```

### 5. 構建和啟動服務

```bash
# 回到專案根目錄
cd ..

# 首次構建映像
docker-compose build

# 啟動服務
docker-compose up -d
```

### 6. 驗證設置

```bash
# 檢查服務狀態
docker-compose ps

# 檢查日誌
docker-compose logs -f

# 確認服務可訪問
- 前端：http://localhost:3000
- 數據庫：localhost:3306
```

### 7. 設置 VS Code（推薦）

確保安裝以下 VS Code 擴展：

- Vue.volar（Vue 3 支援）
- dbaeumer.vscode-eslint（ESLint）
- esbenp.prettier-vscode（Prettier）
- EditorConfig.EditorConfig（EditorConfig）
- vitest.explorer（Vitest）
- ms-playwright.playwright（Playwright）

## 日常開發命令

```bash
# 啟動所有服務（前端 + 資料庫）
npm run docker:up

# 在背景啟動所有服務
docker-compose up -d

# 停止所有服務
docker-compose down

# 查看服務狀態
docker-compose ps

# 查看服務日誌
docker-compose logs -f        # 查看所有服務日誌
docker-compose logs -f frontend  # 只查看前端日誌
docker-compose logs -f db       # 只查看資料庫日誌
```

## 故障排除命令

```bash
# 重新構建容器（當依賴改變時）
docker-compose build

# 重新構建並啟動
docker-compose up --build

# 進入容器內部
docker exec -it snow-sports-frontend sh  # 進入前端容器
docker exec -it snow-sports-db bash      # 進入資料庫容器

# 清理未使用的資源
docker system prune  # 清理所有未使用的容器、網路、映像（鏡像）等資源
```

## 資料庫操作

```bash
# 連接到 MySQL
docker exec -it snow-sports-db mysql -u snow_sports_user -p

# 備份資料庫
docker exec snow-sports-db mysqldump -u root -p snow_sports > backup.sql

# 還原資料庫
docker exec -i snow-sports-db mysql -u root -p snow_sports < backup.sql
```

## 專案結構

```bash
Snow-Sports-Gear-Store/
├── docker/                  # Docker 相關配置
│   ├── frontend/           # 前端 Docker 配置
│   │   └── Dockerfile
│   └── ...
├── frontend/               # 前端專案目錄
├── docker-compose.yml      # Docker 服務配置
├── .env.example           # 環境變數範本
└── .env                   # 實際環境變數（不納入版控）
```

## 注意事項

1. 首次運行時需要複製 .env.example 到 .env 並設置適當的值
2. 修改依賴時需要重新構建容器（docker-compose build）
3. 容器日誌可以幫助排查問題
4. 資料庫數據存儲在 Docker volume 中，重啟容器不會丟失

## 常見問題排解

1. 端口衝突

- 確認本地 3000 和 3306 端口未被占用
- 可以在 docker-compose.yml 中修改端口映射

2. 容器無法啟動

- 檢查 Docker Desktop 是否正在運行
- 查看容器日誌尋找錯誤信息
- 確認環境變數設置正確

3. 前端熱更新不工作

- 確認 volume 映射正確
- 檢查 Vite 配置
