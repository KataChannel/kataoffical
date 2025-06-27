# kataoffical
git add .
git commit -m "update"
git push
ssh root@116.118.85.23
cp /root/secret/.env /root/kataoffical/api/
git pull
docker compose -f 'docker-compose.yml' up -d --build 

# server
chmod +x katalogin.sh
./katalogin.sh
ssh root@116.118.85.23
git pull
### Tạo Cấu Hình
ssh-keygen -t rsa -b 4096
ssh-copy-id root@116.118.85.23

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

nano ~/.ssh/config

Host myserver
HostName 116.118.85.23
User root
IdentityFile ~/.ssh/id_rsa

sudo apt install expect

#!/usr/bin/expect
spawn ssh root@<địa-chỉ-máy-chủ>
expect "password:"
send "mật-khẩu\n"
interact

chmod +x autologin.sh
./autologin.sh


cp /root/secret/.env /root/kataoffical/api/
cp /var/lib/docker/volumes/kataoffical_postgres/_env /root/secret/

docker compose -f 'docker-compose.yml' up -d --build 
docker compose -f 'docker-compose.yml' up -d --build 'postgres'
docker compose -f 'docker-compose.yml' up -d --build 'pgadmin'
docker compose -f 'docker-compose.yml' up -d --build 'datalake_storage'
docker compose -f 'docker-compose.yml' up -d --build 'processing_service'
docker compose down rausachsandbox1-berausachsanbox1
Xoá Tất Cả
docker start $(docker ps -aq) # Stop all containers
docker stop $(docker ps -aq) # Stop all containers
docker rm $(docker ps -aq)  # Remove all containers
docker rmi -f $(docker images -aq) # Remove all images (forcefully if needed)
docker volume rm $(docker volume ls -q) # Remove all volumes
docker network rm $(docker network ls | grep -v "bridge\\|host\\|none" | awk '{print $1}') # Remove non-default networks
docker system prune -a --volumes # Remove all unused data, including volumes
sudo systemctl restart docker
sudo service docker restart

systemctl restart docker

xóa cache và thử lại:
docker stop prune -af
docker builder prune -af
docker image prune -a -f
docker volume prune -a -f

docker exec pgadmin_taza ls -l /var/lib/pgadmin/storage/admin_tazagroup.com/datavttech26_04_2025
docker exec postgres_taza ls -l /var/lib/postgresql/data/backups/ 
docker exec pgadmin_taza find / -name "datavttech26_04_2025"
docker cp pgadmin_taza:/var/lib/pgadmin/storage/admin_tazagroup.com/datavttech26_04_2025 /


docker exec -it processing_service /bin/sh
apt-get update -y && apt-get install -y openssl

# prisma
npx bun prisma migrate dev --name hethong1.7 --skip-generate
npx prisma db push
npx bun prisma generate 


npx create-nx-workspace@latest kataoffical --preset=angular-nest

npx bun add @prisma/client
npx bun add -d prisma
npx bun prisma migrate dev --name kata1.1
npx prisma migrate dev --name kata1.6
npx prisma db push
npx prisma generate 
npx ts-node prisma/scriptdb/exportData.ts
npx ts-node prisma/scriptdb/seed.ts
npx ts-node prisma/scriptdb/backup.ts
npx ts-node prisma/scriptdb/restore.ts
npx ts-node prisma/scriptdb/user.ts

npm install -g npm-check-updates
npx npm-check-updates
npx npm-check-updates -u

docker builder prune -af
docker image prune -a -f
docker volume prune -a -f
docker network prune -f

docker network ls
docker network inspect multi_service_crm_v2_app-network

docker stats multi_service_crm_v2-redis-1

docker exec -it admin_ui_app /bin/bash
docker exec -it admin_ui_app /bin/sh
docker run -it tazagroup-admin-ui /bin/bash

Optimize-VHD -Path "C:\Users\Admin\AppData\Local\Docker\wsl\disk\docker_data.vhdx" -Mode Full



# Angular
npx ng g c dangkyctv --skip-tests --standalone
npx ng g c hotroctv --skip-tests --standalone
npx ng g c faqctv --skip-tests --standalone


### promt
tạo mindmap admin,spa,academy,cosmetics



Kích hoạt và reload
cd /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/kataoffical /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/hethong.timona.edu.vn /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/affiliate /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/shoprausach /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

(Tuỳ chọn) Thêm HTTPS với Certbot
sudo certbot --nginx -d kataoffical.online -d api.kataoffical.online -d storage.kataoffical.online
sudo certbot --nginx -d hethong.tazagroup.vn -d apihethong.tazagroup.vn
sudo certbot --nginx -d affiliate.timona.edu.vn -d apiaffiliate.tazagroup.vn
sudo certbot --nginx -d hethong.timona.edu.vn -d apihethong.timona.edu.vn
sudo certbot --nginx -d shop.rausachtrangia.com -d api.rausachtrangia.com
sudo certbot renew --dry-run


# Ubuntu
sudo ufw status
sudo firewall-cmd --state

sudo ufw allow 6379/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # 

sudo ufw allow 4200/tcp
sudo ufw allow 3200/tcp
sudo ufw allow 5050/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 5555/tcp
sudo ufw allow 4301/tcp
sudo ufw allow 3331/tcp
sudo ufw allow 4400/tcp
sudo ufw allow 3100/tcp
sudo ufw allow 5052/tcp
sudo ufw reload
sudo crontab -e
sudo crontab -l


#Promt
cập nhật code like senior có trycatch và HttpStatus 
cập nhật code like senior có trycatch và trả về lỗi

Đóng vai là lập trình viên chuyên nghiệp 60 năm kinh nghiệm : dự án của tôi sử dụng angular, nestjs, postgres, docker, prisma, socket io, redis


# Auto Update 
npm install -g npm-check-updates
ncu -u next
npm install

npm install ../nextjsshared/kataoffical-nextjs-1.0.1.tgz