# pull the base image
FROM node:16-alpine

# set the working direction
WORKDIR /client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .

COPY package-lock.json .

RUN npm install

# add app
COPY . .

RUN npm run build

# start app
CMD ["npm", "start"]