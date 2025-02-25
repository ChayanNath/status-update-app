FROM node:alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package.json ./

# Install dependencies
RUN npm install --prefer-offline --no-audit --progress=false

# Copy the rest of the application code
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the frontend application
RUN npm run build

EXPOSE 3000

# Run the preview command
CMD ["npm", "run", "preview"]
