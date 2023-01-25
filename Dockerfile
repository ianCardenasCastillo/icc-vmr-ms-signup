# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:18-alpine

ENV NODE_ENV=${NODE_ENV}

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json /usr/src/app

# Install production dependencies.
RUN npm install
RUN npm install -g @nestjs/cli

# Copy local code to the container image.
COPY . /usr/src/app

RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "run", "start:${NODE_ENV}" ]