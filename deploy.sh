#!/bin/bash

# 部署脚本

echo "开始部署 English Reader 应用..."

# 克隆项目
echo "克隆项目..."
git clone https://github.com/JancinHuang/english-reader.git
cd english-reader

# 创建环境变量文件
echo "创建环境变量文件..."
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

# 创建 Nginx 配置文件
echo "创建 Nginx 配置文件..."
cat > nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream english-reader-app {
        server english-reader-app:3000;
    }

    server {
        listen 80;
        server_name _;

        location / {
            proxy_pass http://english-reader-app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
EOF

# 更新 docker-compose.yml 文件
echo "更新 docker-compose.yml 文件..."
cat > docker-compose.yml << EOF
version: '3'
services:
  english-reader-app:
    build: .
    environment:
      - NODE_ENV=production
    restart: always
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - english-reader-app
    restart: always
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
EOF

# 构建并启动容器
echo "构建并启动容器..."
docker-compose up -d --build

# 检查部署状态
echo "检查部署状态..."
docker ps

echo "部署完成！"
echo "应用地址: http://$(hostname -I | awk '{print $1}')"
echo "请确保已在 .env 文件中填入正确的配置信息"
echo "如果需要修改配置，请编辑相应文件后运行: docker-compose up -d --build"

