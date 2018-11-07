FROM mhart/alpine-node:8.12.0

ADD . /usr/src/migrations
# Create app directory
WORKDIR /usr/src/migrations

# Install app dependencies
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .