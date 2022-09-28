FROM node:14-alpine

RUN apk add curl
RUN apk update && apk add bash

RUN mkdir app
WORKDIR /app

COPY package.json ./app
COPY tsconfig.json ./app
COPY docker-entry.sh ./app
COPY wait-for-it.sh ./app

RUN npm install

COPY . /app

RUN npm i typescript -g 

EXPOSE 3000
ENTRYPOINT [ "sh", "docker-entry.sh" ]
CMD [ "npm", "start" ]