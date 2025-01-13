FROM node:18-alpine

RUN mkdir -p /usr/src/webz-news && chown -R node:node /usr/src/webz-news

WORKDIR /usr/src/webz-news

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile --ignore-scripts

COPY --chown=node:node . .
