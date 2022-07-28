FROM node:16-alpine AS dev
RUN apk add --no-cache bash
RUN apk add --no-cache libc6-compat
WORKDIR /Blog
COPY package.json ./
COPY package-lock.json ./
RUN npm install
EXPOSE 3000
CMD ['npm', 'run', 'dev']