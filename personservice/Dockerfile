FROM node:14-alpine

RUN apk add curl
RUN apk update && apk add bash

RUN mkdir personservice
WORKDIR /personservice

RUN npm i typescript -g

COPY package*.json tsconfig.json docker-entry.sh wait-for-it.sh ./

RUN npm i

COPY . .

EXPOSE 3001
ENTRYPOINT [ "sh", "docker-entry.sh" ]
CMD [ "npm", "start" ]