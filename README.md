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