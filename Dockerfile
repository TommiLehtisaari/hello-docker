FROM node:13-alpine

WORKDIR /usr/app

EXPOSE 6000

COPY package.json .

RUN yarn install --production

COPY server.js server.js

USER node

CMD [ "node", "server.js" ]

