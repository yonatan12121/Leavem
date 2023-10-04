# Use an official Node.js runtime as a base image with your specified Node.js version
FROM node:18.12.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your Express app is listening on (Port Configuration: 5000)
EXPOSE 5000

# Command to run your Node.js application using npm start
CMD ["npm", "start"]
