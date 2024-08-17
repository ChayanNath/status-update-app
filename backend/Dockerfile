FROM node:alpine
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Start the application
CMD ["sh", "-c", "node scripts/createAdmin.js && npm start"]
