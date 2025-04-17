# kataoffical
# github
git add .
git commit -m "update"
git push

npx create-nx-workspace@latest kataoffical --preset=angular-nest

npx bun add @prisma/client
npx bun add -d prisma
npx bun prisma migrate dev --name all1.1 --skip-generate
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