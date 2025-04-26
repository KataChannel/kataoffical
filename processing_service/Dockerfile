FROM node:slim
RUN apt-get update -y && apt-get install -y openssl libssl-dev
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY . .
CMD [ "node", "v2/scheduler.js" ]