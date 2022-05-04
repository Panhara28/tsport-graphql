FROM node:12.18.3

ARG MYSQL_DEFAULT
ENV MYSQL_DEFAULT=$MYSQL_DEFAULT

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn install
COPY . .
RUN yarn graph
RUN yarn build
RUN yarn migrate

EXPOSE 80
CMD [ "yarn", "start" ]