# kataoffical
git add .
git commit -m "update"
git push

# server
ssh root@116.118.49.243 
git pull
docker compose -f 'docker-compose.yml' up -d --build 'ferausach'
docker compose -f 'docker-compose.yml' up -d --build 'berausach'

Xoá Tất Cả
docker system prune -a --volumes -f

reset
systemctl restart docker

xóa cache và thử lại:
docker builder prune -af
docker image prune -a -f
docker volume prune -a -f


docker compose up --build
docker compose up -d
docker compose up --no-recreate -d
docker compose down
docker exec -it 718c1476fbfa5c668913f7fa553aed3bb5fad70995f90e6f70a3e806bf61e502 sh

docker exec -it rausach-berausach-1 sh
docker exec -it rausach-berausach-1 /bin/bash

docker exec -it fullstack-postgres-1 psql -U postgres -d mydb

docker exec -it rausach-postgres-1 psql -U postgres
docker inspect rausach-postgres-1 | grep POSTGRES
docker inspect rausach-berausach-1 | grep POSTGRES
docker inspect rausach-berausach-1 | grep POSTGRES
docker exec -it rausach-postgres-1 cat /var/lib/postgresql/data/pg_hba.conf
docker cp rausach-postgres-1:/var/lib/postgresql/data/pg_hba.conf .
docker cp pg_hba.conf rausach-postgres-1:/var/lib/postgresql/data/pg_hba.conf
docker restart rausach-postgres-1
psql -U postgres -d postgres

CREATE USER rausach WITH SUPERUSER PASSWORD 'rausach#2025';
CREATE ROLE rausach WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD 'rausach#2025';

docker exec -it kataoffical-backend-1 /bin/bash
docker exec -it pgadmin /bin/bash
docker exec kataoffical-frontend-1 ls -l /bin/bash
docker exec pgadmin -l /bin/bash
docker --version
docker-compose --version
docker-compose logs -f kataoffical-backend-1
docker-compose logs -f rausach-ferausach
docker-compose logs -f rausach-berausach-1
docker logs node:18
docker logs kataoffical-backend
docker stop priceless_pike
docker rm priceless_pike

docker compose exec rausach-berausach-1 printenv | grep DATABASE_URL

docker compose -f 'docker-compose.yml' up -d --build 'backend'
docker compose -f 'docker-compose.yml' up -d --build 'berausach' 
docker compose -f 'docker-compose.yml' up -d --build 'ferausach' 
docker compose -f 'docker-compose.yml' up -d --build 'postgres' 
docker compose -f 'docker-compose.yml' up -d --build 'pgadmin' 
docker compose -f 'docker-compose.yml' up -d --build '36c39a3e4a35_kataoffical-postgres-1' 

docker exec -it kataoffical-backend-1 sh
bun install -g prisma

prisma studio

docker exec -it kataoffical-backend-1 npx prisma studio
docker exec -it 619a78c186ab npx prisma studio --host 0.0.0.0 --port 5555




bun install @prisma/client
bun install -D prisma
bun prisma init
bun prisma migrate deploy
bun prisma migrate dev --name init
RUN bun run build
RUN bun prisma generate



# Cài Đặt SSH Docker Cho ubuntu 22.04

ls $env:USERPROFILE\.ssh -Force
ssh-keygen -t rsa -b 4096 -C "chikiet88@gmail.com"
cat ~/.ssh/id_rsa.pub
ssh chikiet@116.118.49.243 
ssh root@116.118.49.243 

# Ubuntu
sudo ufw status
sudo firewall-cmd --state

sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # 

sudo ufw allow 4200/tcp
sudo ufw allow 5050/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 5555/tcp
sudo ufw allow 4301/tcp
sudo ufw allow 3331/tcp
sudo ufw reload

sudo crontab -e
sudo crontab -l


@reboot cd kataoffical && docker-compose up -d

Cách lưu lại crontab sau khi chỉnh sửa
Tùy vào trình soạn thảo mặc định, bạn có thể làm như sau:

1. Nếu đang dùng Nano (phổ biến nhất trên Ubuntu)
Nhấn CTRL + X để thoát.
Nhấn Y để xác nhận lưu.
Nhấn Enter để ghi đè và thoát.
2. Nếu đang dùng Vim
Nhấn Esc để đảm bảo bạn không ở chế độ Insert.
Gõ :wq rồi nhấn Enter để lưu và thoát.
3. Nếu đang dùng vi
Nhấn Esc rồi nhập :wq! và nhấn Enter.





#Backup
docker cp <container_name_or_id>:/path/to/backup/file /path/to/destination

docker cp pgadmin:/var/lib/pgadmin/storage/admin_example.com/bk_23_02_2025 ./bk_23_02_2025

docker exec -it rausach-berausach-1 /bin/bash
docker cp credentials.json rausach-berausach-1:/app/dist

cd /etc/nginx/sites-available
sudo certbot --nginx -d sandboxapi2.rausachtrangia.com -d sandbox2.rausachtrangia.com
sudo certbot renew --dry-run
