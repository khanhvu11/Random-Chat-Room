FROM node:16-alpine

WORKDIR /server

# install app dependencies
COPY package.json .

COPY package-lock.json .

RUN sudo npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]

RUN chmod +x /server/node_modules/.bin/nodemon

