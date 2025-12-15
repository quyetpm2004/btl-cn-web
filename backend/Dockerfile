FROM node:22-alpine

WORKDIR /cn-web/backend

COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "production"]