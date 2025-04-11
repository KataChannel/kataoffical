# Dockerfile (Angular Frontend - Development)
FROM node:18-alpine As development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining code
COPY . .

# Expose Angular development server port
EXPOSE 4200

# Command to start dev server, accessible from outside container
# Ensure package.json 'start' script includes '--host 0.0.0.0 --port 4200'
CMD [ "npm", "run", "start" ]