FROM node:14-alpine

RUN apk add curl
RUN apk update && apk add bash

RUN mkdir webservice
WORKDIR /webservice

RUN npm i typescript -g 

COPY package*.json tsconfig.json docker-entry.sh wait-for-it.sh ./

RUN npm i

COPY . .

EXPOSE 3000
ENTRYPOINT [ "sh", "docker-entry.sh" ]
CMD [ "npm", "start" ]