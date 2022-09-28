FROM node:14-alpine

RUN apk add curl
RUN apk update && apk add bash

RUN mkdir app
WORKDIR /app

RUN npm i typescript -g 

COPY package*.json ./
COPY tsconfig.json ./
COPY docker-entry.sh ./
COPY wait-for-it.sh ./

RUN npm i

COPY . .

EXPOSE 3000
ENTRYPOINT [ "sh", "docker-entry.sh" ]
CMD [ "npm", "start" ]