FROM node:10-alpine

COPY . /app

WORKDIR /app

RUN npm install

RUN npm install -g pm2 

CMD pm2-docker start index.js 