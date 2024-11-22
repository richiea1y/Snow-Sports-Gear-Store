# 使用 Node.js 20 LTS 的 Alpine 版本作為基礎映像
# Alpine 是一個極小的 Linux 發行版，可以讓我們的 Docker 映像更小更安全
FROM node:20-alpine

# 設置容器內的工作目錄，所有的操作都會在這個目錄下進行
WORKDIR /app/frontend

# 只複製 package.json 和 package-lock.json
# 這樣做是為了利用 Docker 的緩存機制：
# - 如果這些文件沒有變化，就可以使用緩存的 node_modules
# - 提高建構速度，避免每次都重新安裝依賴
COPY frontend/package*.json ./

# 安裝項目依賴
# 在 Docker 中執行 npm install
RUN npm install

# 複製前端專案的所有文件
# 這一步放在安裝依賴後面是因為源代碼更改的頻率比依賴更改更頻繁
COPY frontend/ .

# 告訴 Docker 這個容器會使用 3000 端口
# 這只是一個文檔說明，實際的端口映射在 docker-compose.yml 中配置
EXPOSE 3000

# 容器啟動時執行的命令
# 啟動 Vite 開發服務器
CMD ["npm", "run", "dev"]