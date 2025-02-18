# kataoffical
git add .
git commit -m "update"
git push

xóa cache và thử lại:
docker builder prune -af
docker compose up --build
docker compose up -d
docker compose up --no-recreate -d
docker compose down
docker exec -it 718c1476fbfa5c668913f7fa553aed3bb5fad70995f90e6f70a3e806bf61e502 sh

docker exec -it fullstack-postgres-1 psql -U postgres -d mydb


# Cài Đặt SSH Docker Cho ubuntu 22.04

ls $env:USERPROFILE\.ssh -Force
ssh-keygen -t rsa -b 4096 -C "chikiet88@gmail.com"
cat ~/.ssh/id_rsa.pub
ssh chikiet@116.118.49.243 
ssh root@116.118.49.243 

docker --version
docker-compose --version

sudo ufw status
sudo firewall-cmd --state

sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # 

sudo ufw allow 4200/tcp
sudo ufw allow 5050/tcp
sudo ufw allow 3000/tcp
sudo ufw reload


docker-compose logs -f


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