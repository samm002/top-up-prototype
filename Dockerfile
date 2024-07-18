# Use Node.js 16 LTS as base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
