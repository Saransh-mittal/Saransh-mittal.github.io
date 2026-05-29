# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Railway injects PORT env var — nginx template uses it
ENV PORT=80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
