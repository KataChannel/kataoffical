FROM node:slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY . .
CMD [ "node", "v2/scheduler.js" ]