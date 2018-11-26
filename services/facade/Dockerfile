FROM mhart/alpine-node:8.12.0

ADD . /usr/src/facade
# Create app directory
WORKDIR /usr/src/facade

# Install app dependencies
COPY package*.json ./

RUN npm install --quite
RUN npm run build
RUN npm prune --production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]