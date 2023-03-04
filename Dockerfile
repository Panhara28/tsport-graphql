FROM node:12.22.1

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run graph
RUN npm run build

EXPOSE 80
CMD [ "npm", "start" ]