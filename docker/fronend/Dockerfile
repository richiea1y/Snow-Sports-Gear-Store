# 使用 Node.js 20 LTS 的 Alpine 版本作為基礎映像
# Alpine 是一個極小的 Linux 發行版，可以讓我們的 Docker 映像更小更安全
FROM node:20-alpine
# 1. FROM：指定基礎映像，所有的容器都需要一個基礎映像來構建
# 2. node:20-alpine：
#    - node:20 表示使用 Node.js 20 版本
#    - alpine 是一個極小的 Linux 發行版，容器體積更小、更安全
#    - 如果不用 alpine，可能會用 node:20 或 node:20-slim，但檔案會更大

# 設置容器內的工作目錄，所有的操作都會在這個目錄下進行
WORKDIR /app/frontend
# 1. WORKDIR：在容器內建立工作目錄
# 2. /app/frontend：
#    - /app 是常用的應用程式目錄名稱
#    - /frontend 表明這是前端專案
#    - 後續的所有操作都會在這個目錄下執行

# 只複製 package.json 和 package-lock.json
# 這樣做是為了利用 Docker 的緩存機制：
# - 如果這些文件沒有變化，就可以使用緩存的 node_modules
# - 提高建構速度，避免每次都重新安裝依賴
COPY frontend/package*.json ./
# 1. COPY：從主機複製文件到容器內
# 2. frontend/package*.json：
#    - package*.json 會匹配 package.json 和 package-lock.json
#    - frontend/ 是因為我們的 Dockerfile 在 docker/frontend/ 目錄下
# 3. ./：複製到當前工作目錄（/app/frontend）
# 注意：這步驟要在 COPY frontend/ . 之前，是為了利用 Docker 的緩存機制

# 安裝項目依賴
# 在 Docker 中執行 npm install
RUN npm install
# 1. RUN：在容器建構時執行命令
# 2. npm install：安裝 package.json 中定義的所有依賴
# 注意：這步會在容器中建立 node_modules 目錄，裡面包含所有的依賴

# 複製前端專案的所有文件 (複製前端源代碼)
# 這一步放在安裝依賴後面是因為源代碼更改的頻率比依賴更改更頻繁
COPY frontend/ .
# 1. COPY：再次使用 COPY 命令
# 2. frontend/：複製整個前端目錄的內容
# 3. .：複製到當前工作目錄
# 注意：這步放在 npm install 後面是因為源代碼變動比較頻繁，可以更好地利用緩存

# 告訴 Docker 這個容器會使用 3000 端口
EXPOSE 3000
# 1. EXPOSE：聲明容器運行時監聽的端口
# 2. 3000：對應 Vite 開發服務器的端口
# 注意：這只是聲明，實際的端口映射在 docker-compose.yml 中配置

# 容器啟動時執行的命令
# 啟動 Vite 開發服務器
CMD ["npm", "run", "dev"]
# 1. CMD：指定容器啟動時執行的命令
# 2. ["npm", "run", "dev"]：
#    - 使用數組格式來指定命令和參數
#    - 這會執行 package.json 中定義的 dev 腳本
#    - 啟動 Vite 開發服務器


# 基礎映像設置FROMnode：20-alpine# 
#  1.FROM：指定基礎映像，所有的容器都需要一個基礎映像來構建
#  2.node：20-alpine：
#    - node：20 表示使用 Node.js 20 版本
#    - alpine 是一個極小的 Linux 發行版，容器體積更小、更安全
#    - 如果不用 alpine，可能會用 node：20 或 node：20-slim，但檔案會更大

# 設置工作目錄WORKDIR/app/frontend
#   1.WORKDIR：在容器內建立工作目錄
#   2./app/frontend：
#     - /app 是常用的應用程式目錄名稱
#     - /frontend 表明這是前端專案
#     - 後續的所有操作都會在這個目錄下執行

# 複製 package.json 和 package-lock.json: COPY frontend/package*.json ./
#   1.COPY：從主機複製文件到容器內
#   2.frontend/package*.json：
#     - package*.json 會匹配 package.json 和 package-lock.json
#     - frontend/ 是因為我們的 Dockerfile 在 docker/frontend/ 目錄下
#   3. ./：複製到當前工作目錄（/app/frontend）
#     注意：步步驟要在 COPY frontend/ .之前，是為了利用 Docker 的緩存機制

# 安裝依賴RUN npm install
#   1.RUN：在容器建構時執行命令
#   2.npm install：安裝 package.json 中定義的所有依賴
#     注意：這步會在容器中建立 node_modules 目錄

# 複製前端源代碼 COPY frontend/ .
#   1.COPY：再次使用 COPY 命令
#   2.frontend/：複製整個前端目錄的內容
#   3. .：複製到當前工作目錄
# 注意：這步放在 NPM install 後面是因為源代碼變動比較頻繁，可以更好地利用緩存

# 暴露端口EXPOSE3000
#   1.PRESENTATION：聲明容器運行時監聽的端口
#   2.3000：對應 Vite 開發服務器的端口
# 注意：這只是聲明，實際的端口映射在 docker-compose.yml 中配置

# 啟動命令CMD[“npm”，“run”，“dev”]
# 1.CMD：指定容器啟動時執行的命令
# 2.[“npm”， “run”， “dev”]：
# - 使用數組格式來指定命令和參數# - 這會執行 package.json 中定義的 dev 腳本
# - 啟動 Vite 開發服務器