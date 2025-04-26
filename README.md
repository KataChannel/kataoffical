# kataoffical
git add .
git commit -m "update"
git push

# server
ssh root@116.118.49.243 
git pull
docker compose -f 'docker-compose.yml' up -d --build 
docker compose -f 'docker-compose.yml' up -d --build 'shared-core-api'
docker compose -f 'docker-compose.yml' up -d --build 'admin-ui'
docker compose -f 'docker-compose.yml' up -d --build 'academy-api'
docker compose -f 'docker-compose.yml' up -d --build 'postgres_taza'
docker compose -f 'docker-compose.yml' up -d --build 'pgadmin_taza'
docker compose -f 'docker-compose.yml' up -d --build 'datalake_storage'
docker compose down rausachsandbox1-berausachsanbox1
Xoá Tất Cả
docker system prune -a --volumes -f

reset
systemctl restart docker

xóa cache và thử lại:
docker builder prune -af
docker image prune -a -f
docker volume prune -a -f

docker exec pgadmin_taza ls -l /var/lib/pgadmin/storage/admin_tazagroup.com/datavttech26_04_2025
docker exec postgres_taza ls -l /var/lib/postgresql/data/backups/ 
docker exec pgadmin_taza find / -name "datavttech26_04_2025"
docker cp pgadmin_taza:/var/lib/pgadmin/storage/admin_tazagroup.com/datavttech26_04_2025 /
# prisma
npx bun prisma migrate dev --name hethong1.7 --skip-generate
npx prisma db push
npx bun prisma generate 


npx create-nx-workspace@latest kataoffical --preset=angular-nest

npx bun add @prisma/client
npx bun add -d prisma
npx bun prisma migrate dev --name process1.6 --skip-generate
npx prisma db push
npx bun prisma generate 
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


### promt
tạo mindmap admin,spa,academy,cosmetics



Kích hoạt và reload
cd /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/hethong.tazagroup.vn /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/hethong.timona.edu.vn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

(Tuỳ chọn) Thêm HTTPS với Certbot
sudo certbot --nginx -d hethong.tazagroup.vn -d apihethong.tazagroup.vn
sudo certbot --nginx -d hethong.timona.edu.vn -d apihethong.timona.edu.vn
sudo certbot renew --dry-run


# Ubuntu
sudo ufw status
sudo firewall-cmd --state

sudo ufw allow 6379/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # 

sudo ufw allow 4200/tcp
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