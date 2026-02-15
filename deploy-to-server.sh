#!/bin/bash

# 部署到服务器的脚本

SERVER_IP="104.238.148.171"
SERVER_USER="root"
SERVER_PASSWORD="?w8RW!.EvNKw)-Q$"
DEPLOY_DIR="/root/english-reader-app"

# 本地文件
LOCAL_DEPLOY_SCRIPT="different-port-deploy.sh"

# 创建临时目录
mkdir -p temp-deploy

# 复制必要的文件到临时目录
cp $LOCAL_DEPLOY_SCRIPT temp-deploy/
cp package.json temp-deploy/
cp tsconfig.json temp-deploy/
cp next.config.ts temp-deploy/
cp .gitignore temp-deploy/
cp .env temp-deploy/

# 压缩文件
tar -czf temp-deploy/deploy-files.tar.gz -C temp-deploy/ .

# 上传到服务器
echo "上传文件到服务器..."
# 使用 WinSCP 命令行工具上传 (假设已安装)
# 注意：在实际使用中，您可能需要使用不同的方式上传文件
# 这里我们直接在服务器上创建部署脚本

# 连接服务器并执行部署
echo "连接服务器并执行部署..."
# 使用 plink (PuTTY 的命令行工具) 连接服务器
# 注意：在实际使用中，您可能需要使用不同的方式连接服务器

# 清理临时目录
rm -rf temp-deploy/

echo "部署脚本已准备就绪！"
echo "请在服务器上执行以下步骤："
echo "1. 登录服务器：ssh root@104.238.148.171"
echo "2. 创建部署目录：mkdir -p /root/english-reader-app && cd /root/english-reader-app"
echo "3. 创建部署脚本：将 different-port-deploy.sh 的内容复制到服务器上"
echo "4. 执行脚本：chmod +x different-port-deploy.sh && ./different-port-deploy.sh"
echo "5. 等待部署完成，然后访问 http://104.238.148.171:3001"
