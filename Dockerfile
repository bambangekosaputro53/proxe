# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install application dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose the port that the app runs on
EXPOSE 8080

# Run the application
CMD ["npm", "start"]
