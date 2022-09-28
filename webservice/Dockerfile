FROM node:14-alpine as base

RUN apk add curl
RUN apk update && apk add bash

RUN npm i npm@latest -g
# RUN npm i typescript -g 

RUN mkdir app && chown -R node:node /app
# RUN mkdir app
# RUN chmod +x /wait-for-it.sh
# RUN mkdir app
WORKDIR /app

COPY --chown=node:node package.json package-lock.json wait-for-it.sh docker-entry.sh /app/

# COPY --chown=node:node . /app/

USER node

RUN npm install && npm install typescript && npm cache clean --force

# COPY package.json wait-for-it.sh ./

# RUN chown -R node .

# RUN chmod +x app/wait-for-it.sh ./docker-entry.sh

# RUN sudo chmod +x docker-entry.sh

# ENV PATH app/node_modules/.bin:$PATH

# RUN chmod +x ./

EXPOSE 3000

ENTRYPOINT [ "sh", "docker-entry.sh" ]
CMD [ "npm", "start" ]