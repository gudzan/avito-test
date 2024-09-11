FROM node:20.12.2 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html