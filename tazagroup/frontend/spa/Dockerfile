# Dockerfile (Angular Frontend - Development)
FROM node:18-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD [ "npm", "run", "start" ] # Ensure start script uses '--host 0.0.0.0 --port 4200'