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

<<<<<<< HEAD
RUN chmod +x /server/node_modules/.bin/nodemon

=======
RUN chmod +x /server/node_modules/.bin/nodemon
>>>>>>> 2c7b1513e48c83bd55d87af5334438c20b48f41d
