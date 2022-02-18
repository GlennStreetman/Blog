FROM node:14-alpine AS dev
RUN apk add --no-cache bash
WORKDIR /Blog
COPY package*.json ./
RUN npm ci
EXPOSE 3000