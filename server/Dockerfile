FROM node:16-alpine

WORKDIR /server

# install app dependencies
COPY package.json .

COPY package-lock.json .

RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]