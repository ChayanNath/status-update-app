FROM node:alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package.json ./

# Install dependencies
RUN npm install --prefer-offline --no-audit --progress=false

# Copy the rest of the application code
COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Build the frontend application
RUN npm run build

EXPOSE 3000

# Run the preview command
CMD ["npm", "run", "preview"]
