FROM node:8

ADD . /usr/src/gateway
# Create app directory
WORKDIR /usr/src/gateway

# Install app dependencies
COPY package*.json gulpfile.js tsconfig.json ./

RUN npm install
# RUN npm install --only=production
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]