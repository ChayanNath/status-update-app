# Status Update App

This application is designed to help teams update and track their daily tasks and display them during scrum meetings. It allows users to create teams, update their statuses, and fetch the status updates of team members.

## Features

- **Create Teams:** Users can create teams and add members to the teams.
- **Daily Status Updates:** Team members can update their daily status with a title and description.
- **Fetch Status Updates:** Users can fetch the status updates of all team members of a team or individual team members.
- **Export to Excel:** Admins can export status updates to an Excel sheet, with each sheet named after the user and updates in each row, for a team or all users.
- **Admin Rights:** Admin users can create teams and add members to teams.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn
- Docker
- Docker Compose

### Installation

#### 1. Clone the repository:

```sh
git clone https://github.com/your-repo/status-update-app.git
```

#### 2. Navigate to the project directory:

```sh
cd status-update-app
```

#### 3. Install the dependencies for the backend:

```sh
cd backend
npm install
```

#### 4. Install the dependencies for the frontend:

```sh
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
PORT=your_port
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
PASSPORT_STRATEGY_CONFIG=your_passport_strategy_config
```

### Docker Setup

#### 1. Build and Run the Application with Docker:

You can use Docker Compose to easily set up and run the application. Docker Compose will handle the setup of both the backend, frontend, and MongoDB services.

1. **Ensure Docker is installed and running on your system.**

2. **Build and run the containers:**

   ```sh
   docker-compose up --build
   ```

   This command will:

   - Build the Docker images for the backend and frontend.
   - Set up the MongoDB service.
   - Start all services.

3. **Access the application:**

   Once the services are running, you can access the application in your browser. The default port for the frontend is usually `3000` (unless configured otherwise in your `.env` file).

   ```sh
   http://localhost:3000
   ```

#### 2. Docker Compose File

Here is an example of a `docker-compose.yml` file used for this application:

```yaml
version: "3.8"

services:
  mongo:
    image: mongo:latest
    container_name: db_container
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    volumes:
      - mongo_data:/data/db

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: backend
    environment:
      PORT: 5000
      DATABASE_URL: mongodb://root:example@mongo:27017/status-update-app?authSource=admin
      SESSION_SECRET: your_session_secret
      PASSPORT_STRATEGY_CONFIG: your_passport_strategy_config
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    volumes:
      - ./backend:/app

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: frontend
    environment:
      REACT_APP_API_URL: http://localhost:5000
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app

volumes:
  mongo_data:
```

### Notes

- **Volumes:** The MongoDB data is stored in a Docker volume named `mongo_data` to persist data across container restarts.
- **Dependencies:** The backend service depends on the MongoDB service, and the frontend depends on the backend, ensuring the proper startup order.

#### 3. Stopping and Removing Containers

To stop the running containers, use:

```sh
docker-compose down
```

This will stop and remove the containers but preserve the data in the volumes.

#### 4. Rebuilding Containers

If you make changes to the Docker configuration or the application code, you may need to rebuild the containers:

```sh
docker-compose up --build
```

This will rebuild the images and start the containers with the updated code.
