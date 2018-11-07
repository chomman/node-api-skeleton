FROM mhart/alpine-node:8.12.0

ADD . /usr/src/demo
# Create app directory
WORKDIR /usr/src/demo

# Install app dependencies
COPY package*.json gulpfile.js tsconfig.json ./

RUN npm install --quite
RUN npm run build
RUN npm prune --production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]