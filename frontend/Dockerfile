FROM node:22-alpine AS build

WORKDIR /cn-web/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /cn-web/frontend/dist /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
# Nginx image tự động chạy envsubst nếu file có đuôi .template nằm trong /etc/nginx/templates/
CMD ["nginx", "-g", "daemon off;"]