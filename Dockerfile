FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 80

CMD [ "yarn", "start" ]