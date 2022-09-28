FROM node:14-alpine as base

RUN apk add curl
RUN apk update && apk add bash

RUN npm i npm@latest -g

RUN mkdir app && chown node:node app
WORKDIR /app

# RUN chmod +x ./wait-for-it.sh

USER node
COPY --chown=node:node package.json package-lock.json* wait-for-it.sh ./

RUN npm install --no-optional && npm cache clean --force
ENV PATH app/node_modules/.bin:$PATH

RUN chmod +x ./wait-for-it.sh


EXPOSE 3001
