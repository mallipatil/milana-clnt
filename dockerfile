# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json .

# Install frontend dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

COPY .env .

# Build the React app
RUN npm run build

# Expose the port on which the React app will run
EXPOSE 4040

# Start the React app
CMD ["npm", "start"]