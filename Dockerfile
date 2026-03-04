# Use the official Node.js 16 image.
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies including 'devDependencies'
RUN npm install

# Copy local code to the container image.
COPY . .

# Bind the Express server to port 3000.
EXPOSE 3000

# Run the web service on container startup.
CMD [ "node", "app.js" ]
