FROM mhart/alpine-node:8.12.0

ADD . /usr/src/gateway
# Create app directory
WORKDIR /usr/src/gateway

# Install app dependencies
COPY package*.json gulpfile.js tsconfig.json ./

RUN npm install --quite
RUN npm run build
RUN npm prune --production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]