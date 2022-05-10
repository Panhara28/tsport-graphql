FROM node:12.18.3

ARG MYSQL_DEFAULT
ARG S1
ENV MYSQL_DEFAULT=$MYSQL_DEFAULT
ENV S1=$S1

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run graph
RUN npm run build
RUN npm run migrate

EXPOSE 80
CMD [ "npm", "start" ]