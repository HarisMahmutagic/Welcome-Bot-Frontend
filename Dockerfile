FROM node:12

# App Directory
WORKDIR /

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5005

# Run app
CMD [ "node", "server.js" ]