FROM node:8.6.0

MAINTAINER Ilkka Oksanen <iao@iki.fi>

RUN apt-get update && apt-get install -y postgresql-client

COPY package.json /app/
COPY yarn.lock /app/
COPY wait-for-postgres.sh /app/

WORKDIR /app/

RUN yarn install

COPY migrations /app/migrations
COPY index.js /app/


CMD yarn start
