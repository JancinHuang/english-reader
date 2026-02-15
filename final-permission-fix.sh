#!/bin/bash

# 最终修复权限问题的部署脚本

echo "开始部署 English Reader 应用..."

# 创建部署目录
mkdir -p /root/english-reader-app
cd /root/english-reader-app

# 复制必要的文件
echo "复制必要的文件..."

# 创建 Dockerfile
cat > Dockerfile << EOF
# 使用官方Node.js镜像作为基础
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install && \
  # 修复权限问题 \
  chmod -R +x node_modules/.bin

# 复制项目文件
COPY . .

# 构建项目
RUN npx next build

# 暴露3000端口
EXPOSE 3000

# 启动应用
CMD ["npx", "next", "start"]
EOF

# 创建 package.json
cat > package.json << EOF
{
  "name": "english-reader-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.1.6",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "@supabase/supabase-js": "2.46.1"
  },
  "devDependencies": {
    "@types/node": "20.11.30",
    "@types/react": "18.3.1",
    "@types/react-dom": "18.3.0",
    "eslint": "9.2.0",
    "eslint-config-next": "16.1.6",
    "typescript": "5.4.3"
  }
}
EOF

# 创建 package-lock.json 占位符
cat > package-lock.json << EOF
{
  "name": "english-reader-app",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {}
}
EOF

# 创建 tsconfig.json
cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# 创建 next.config.ts
cat > next.config.ts << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig
EOF

# 创建 .gitignore
cat > .gitignore << EOF
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
EOF

# 创建环境变量文件
cat > .env << EOF
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Translation API
TRANSLATION_API_KEY=your-translation-api-key
TRANSLATION_API_URL=https://api.example.com/translate
EOF

echo "请编辑 .env 文件，填入正确的配置信息"

# 创建 docker-compose.yml 文件
cat > docker-compose.yml << EOF
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always
EOF

# 创建必要的目录结构
mkdir -p src/app src/app/read src/app/quiz src/components src/lib src/utils

# 创建 next-env.d.ts
cat > next-env.d.ts << EOF
t/// <reference types="next" />
t/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
EOF

# 创建基本的页面文件
cat > src/app/page.tsx << EOF
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <h1>English Reader App</h1>
      <p>Welcome to English Reader App</p>
    </div>
  )
}

export default Home
EOF

# 创建 layout.tsx
cat > src/app/layout.tsx << EOF
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'English Reader App',
  description: 'An app for reading English articles and taking quizzes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF

# 创建 globals.css
cat > src/app/globals.css << EOF
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: #333;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  margin: 2rem 0;
  text-align: center;
}
EOF

# 构建并启动容器
echo "构建并启动容器..."
docker-compose up -d --build

# 检查部署状态
echo "检查部署状态..."
docker-compose ps

echo "部署完成！"
echo "应用地址: http://$(hostname -I | awk '{print $1}'):3000"
echo "请确保已在 .env 文件中填入正确的配置信息"
echo "如果需要修改配置，请编辑相应文件后运行: docker-compose up -d --build"
