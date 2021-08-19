FROM node:16-alpine

WORKDIR /server
RUN npm install -g nodemon
# install app dependencies
COPY package.json .

COPY package-lock.json .

RUN npm install

# add app
COPY . .

EXPOSE 5000

# start app
CMD ["sleep", "3600"]

