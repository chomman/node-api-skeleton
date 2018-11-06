FROM node:8

ADD . /usr/src/a_service
# Create app directory
WORKDIR /usr/src/a_service

# Install app dependencies
COPY package*.json gulpfile.js tsconfig.json ./

RUN npm install
# RUN npm install --only=production
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]