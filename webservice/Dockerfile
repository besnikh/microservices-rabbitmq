FROM node:14-alpine as base

RUN apk add curl
RUN apk update && apk add bash

RUN npm i npm@latest -g
RUN npm i typescript -g 

RUN mkdir app && chown -R node:node /app
# RUN mkdir app
# RUN chmod +x /wait-for-it.sh
# RUN mkdir app
WORKDIR /app

USER node

COPY --chown=node:node package.json package-lock.json wait-for-it.sh docker-entry.sh ./

RUN npm install && npm cache clean --force

RUN chown -R node:node /app/dist/

EXPOSE 3000
ENTRYPOINT [ "sh", "docker-entry.sh" ]
CMD [ "npm", "start" ]