FROM node:14-alpine as base

RUN apk add curl
RUN apk update && apk add bash

RUN npm i npm@latest -g

RUN mkdir app && chown node:node app
# RUN mkdir app
# RUN chmod +x /wait-for-it.sh
# RUN mkdir app
WORKDIR /app

USER node

COPY --chown=node:node package.json package-lock.json* wait-for-it.sh docker-entry.sh ./
# COPY package.json wait-for-it.sh ./
RUN npm install --no-optional && npm cache clean --force
RUN npm install typescript --save-dev

COPY . /app/

# RUN chmod +x app/wait-for-it.sh ./docker-entry.sh

# RUN sudo chmod +x docker-entry.sh

# ENV PATH app/node_modules/.bin:$PATH

# RUN chmod +x ./

EXPOSE 3000

ENTRYPOINT [ "sh", "docker-entry.sh" ]
CMD [ "npm", "start" ]