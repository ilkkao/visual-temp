FROM node:8.6.0

MAINTAINER Ilkka Oksanen <iao@iki.fi>

COPY index.js /app/
COPY package.json /app/
COPY yarn.lock /app/

WORKDIR /app/

RUN yarn install

CMD yarn start
